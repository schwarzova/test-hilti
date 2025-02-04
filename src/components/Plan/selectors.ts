import { createSelector } from 'reselect';
import { PlanState } from './store';
import { Anchor, MeasurementPoint, Point, Tag } from '../../types';
import {
  convertCmToPx,
  MEASURED_POINTS,
  transformPointWithScale,
} from './utils';
import { GROUND_TRUTH_POINTS } from '../../mocks/mocks';

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
    (state: PlanState) => state.parsedSvgData.scale,
  ],
  (tags, svgScaleX, svgScaleY, transformMatrix, scale): Tag[] => {
    return tags.map<Tag>((t) => {
      const newPosition = transformPointWithScale(
        { x: t.position.x, y: t.position.y },
        transformMatrix,
        svgScaleX,
        svgScaleY,
      );
      // error * 2 to get diameter
      const error2dInPx = convertCmToPx(t.error2d * 2, scale);

      return {
        ...t,
        error2d: error2dInPx,
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
