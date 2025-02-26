import { createSelector } from 'reselect';
import { PlanState } from './store';
import { Anchor, MeasurementPoint, Point, Tag, TagMap } from '../../types';
import {
  convertCmToPx,
  convertZToMeters,
  transformPointWithScale,
} from './utils';
import { GROUND_TRUTH_POINTS } from '../../mocks/mocks';
import { reverse, sortedUniqBy } from 'lodash';

export const getConvertedAnchors = createSelector(
  [
    (state: PlanState) => state.anchors,
    (state: PlanState) => state.svgScaleX,
    (state: PlanState) => state.svgScaleY,
    (state: PlanState) => state.parsedSvgData.transformMatrix,
  ],
  (anchors, svgScaleX, svgScaleY, transformMatrix): Anchor[] => {
    return anchors.map((a) => {
      const newPoint: Point = transformPointWithScale(
        { x: a.x, y: a.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );

      return { ...a, x: newPoint.x, y: newPoint.y };
    });
  },
);

export const getConvertedTags = createSelector(
  [
    (state: PlanState) => state.planMode,
    (state: PlanState) => state.anchors,
    (state: PlanState) => state.tags,
    (state: PlanState) => state.generatedTags,
    (state: PlanState) => state.svgScaleX,
    (state: PlanState) => state.svgScaleY,
    (state: PlanState) => state.parsedSvgData.transformMatrix,
    (state: PlanState) => state.parsedSvgData.realDistance,
    (state: PlanState) => state.parsedSvgData.svgDistance,
    (state: PlanState) => state.parsedSvgData.tlsDistance,
  ],
  (
    planMode,
    anchors,
    tags,
    generatedTags,
    svgScaleX,
    svgScaleY,
    transformMatrix,
    realDistance,
    svgDistance,
    tlsDistance,
  ): Tag[] => {
    const usedTags = !planMode || planMode === 'latest' ? tags : generatedTags;

    return usedTags.map<Tag>((t) => {
      const newPosition = transformPointWithScale(
        { x: t.position.x, y: t.position.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );
      const error2dDiameter = t.error2d * 2;
      const error2dInPx = convertCmToPx(
        error2dDiameter,
        svgDistance,
        realDistance,
      );
      // 2 is hardcoded for Trade Hall
      const anchorOriginZ = anchors.find((a) => a.x === 0 && a.y === 0)?.z || 2;
      const zInMeters = convertZToMeters(
        anchorOriginZ,
        t.position.z,
        realDistance,
        tlsDistance,
      );

      return {
        ...t,
        error2d: error2dInPx,
        position: {
          ...t.position,
          x: newPosition.x,
          y: newPosition.y,
          z: zInMeters,
        },
      };
    });
  },
);

export const getConvertedGroundTruthPoints = createSelector(
  [
    (state: PlanState) => state.svgScaleX,
    (state: PlanState) => state.svgScaleY,
    (state: PlanState) => state.parsedSvgData.transformMatrix,
  ],
  (svgScaleX, svgScaleY, transformMatrix): MeasurementPoint[] => {
    return GROUND_TRUTH_POINTS.map((p) => {
      const point = transformPointWithScale(
        { x: p.x, y: p.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );
      return { ...p, x: point.x, y: point.y };
    });
  },
);

export const getTagsFromSelectedInterval = createSelector(
  [
    (state: PlanState) => state.allTags,
    (state: PlanState) => state.replayDate,
    (state: PlanState) => state.replayTime,
  ],
  (allTags, replayDate, replayTime): Tag[] => {
    if (!replayDate) {
      return allTags;
    }

    const startDate = replayDate.toDate();
    startDate.setHours(0, 0, 0, 0);
    if (replayTime) {
      const hours = replayTime.hour();
      const minutes = replayTime.minute();
      const seconds = replayTime.second();

      startDate.setHours(hours, minutes, seconds, 0);
    }

    const minimalValue = startDate.getTime();

    return allTags.filter((tag) => {
      const tagTime = new Date(tag.timestamp).getTime();

      return tagTime > minimalValue;
    });
  },
);

export const getUniqueTagCount = createSelector(
  [getTagsFromSelectedInterval],
  (allTags): number => {
    return [...new Set(allTags.map((t) => t.tagId))].length;
  },
);

function getResetTime(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000000000`;
}

export const getIntervalMap = createSelector(
  [getTagsFromSelectedInterval],
  (tagsInRange): [TagMap, Tag | null] => {
    const mappedTags = tagsInRange.map((tag) => {
      const resetTime = getResetTime(tag.timestamp);
      return { ...tag, timestamp: resetTime };
    });

    const map = mappedTags.reduce<TagMap>((acc, tag) => {
      if (!acc[tag.tagId]) {
        acc[tag.tagId] = [tag];
      } else {
        acc[tag.tagId] = [...acc[tag.tagId], tag];
      }

      return acc;
    }, {});

    const sortedMap = Object.keys(map).reduce<TagMap>((acc, tagId) => {
      const tagMeasurements = map[tagId];

      const sortedTags = reverse(
        sortedUniqBy(tagMeasurements, (t) => {
          const time = new Date(t.timestamp).getTime();
          return time;
        }),
      );

      acc[tagId] = sortedTags;

      return acc;
    }, {});

    const startPosition = sortedUniqBy(
      Object.keys(sortedMap).map((tagId) => sortedMap[tagId][0]),
      (t) => new Date(t.timestamp).getTime(),
    )[0];

    return [sortedMap, startPosition];
  },
);
