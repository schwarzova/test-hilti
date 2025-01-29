import { createSelector } from 'reselect';
import { PlanState } from './store';
import { Anchor, Point, Tag } from '../../types';
import { MEASURED_POINTS, transformPointWithScale } from './utils';

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
    (state: PlanState) => state.tags,
    (state: PlanState) => state.svgScaleX,
    (state: PlanState) => state.svgScaleY,
    (state: PlanState) => state.parsedSvgData.transformMatrix,
  ],
  (tags, svgScaleX, svgScaleY, transformMatrix): Tag[] => {
    return tags.map<Tag>((t) => {
      const newPosition = transformPointWithScale(
        { x: t.position.x, y: t.position.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );

      return {
        ...t,
        position: {
          ...t.position,
          x: newPosition.x,
          y: newPosition.y,
        },
      };
    });
  },
);

export const getConvertedMeasuredPoints = createSelector(
  [
    (state: PlanState) => state.svgScaleX,
    (state: PlanState) => state.svgScaleY,
    (state: PlanState) => state.parsedSvgData.transformMatrix,
  ],
  (svgScaleX, svgScaleY, transformMatrix): Point[] => {
    return MEASURED_POINTS.map((p) =>
      transformPointWithScale(p, transformMatrix, svgScaleX, svgScaleY),
    );
  },
);
