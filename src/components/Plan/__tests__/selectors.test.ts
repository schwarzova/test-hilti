import { expect, test } from 'vitest';
import {
  getConvertedAnchors,
  getConvertedGroundTruthPoints,
  getConvertedTags,
  getTagsFromSelectedInterval,
  getUniqueTagCount,
} from '../selectors';
import { PlanState, usePlanStore } from '../store';
import { Anchor, MeasurementPoint, Tag, TransformMatrix } from '../../../types';
import dayjs from 'dayjs';

const emptyPlanStore = usePlanStore.getState();

const transformMatrix: TransformMatrix = [1, 1, 1, 1, 1, 1];

test('getConvertedAnchors', () => {
  const state: PlanState = {
    ...emptyPlanStore,
    anchors: [
      {
        id: 'Anchor 1',
        x: 0,
        y: 0,
        z: 2,
      },
      {
        id: 'Anchor 2',
        x: -4.5,
        y: 0,
        z: 2,
      },
    ],
    svgScaleX: 2,
    svgScaleY: 1,
    parsedSvgData: {
      ...emptyPlanStore.parsedSvgData,
      transformMatrix,
    },
  };
  const result: Anchor[] = [
    {
      id: 'Anchor 1',
      x: 2,
      y: 1,
      z: 2,
    },
    {
      id: 'Anchor 2',
      x: -7,
      y: -3.5,
      z: 2,
    },
  ];
  expect(getConvertedAnchors(state)).toEqual(result);
});

const tagBase1 = {
  tagId: '1111',
  timestamp: '1738146250',
  batteryLevel: 85,
  error2d: 0.4,
  error3d: 45,
  los: 'a1a2a3a4',
  measureName: 'sensor_data',
};

test.each([
  {
    description: 'getConvertedTags',
    anchors: [{ id: 'Anchor 1', x: 0, y: 0, z: 2 }],
    expected: [
      {
        ...tagBase1,
        error2d: 0.016,
        position: {
          x: 0.6571299032077345,
          y: 0.32856495160386723,
          z: 0.4095744347657304,
        },
      },
    ],
  },
  {
    description: 'getConvertedTags - no origin anchor',
    anchors: [{ id: 'Anchor 2', x: 1, y: 1, z: 2 }],
    expected: [
      {
        ...tagBase1,
        error2d: 0.016,
        position: {
          x: 0.6571299032077345,
          y: 0.32856495160386723,
          z: 0.4095744347657304,
        },
      },
    ],
  },
])('$description', ({ anchors, expected }) => {
  const state: PlanState = {
    ...emptyPlanStore,
    anchors,
    tags: [
      {
        ...tagBase1,
        position: {
          x: -0.5274726092280309,
          y: -0.14396243916810192,
          z: -1.1808511304685392,
        },
      },
    ],
    svgScaleX: 2,
    svgScaleY: 1,
    parsedSvgData: {
      ...emptyPlanStore.parsedSvgData,
      transformMatrix,
      realDistance: 0.5,
      svgDistance: 1,
      tlsDistance: 1,
    },
  };

  expect(getConvertedTags(state)).toEqual(expected);
});

test('getConvertedGroundTruthPoints', () => {
  const state: PlanState = {
    ...emptyPlanStore,
    svgScaleX: 2,
    svgScaleY: 1,
    parsedSvgData: {
      ...emptyPlanStore.parsedSvgData,
      transformMatrix,
    },
  };
  const result: MeasurementPoint[] = [
    {
      id: 'Measurement Point 1',
      x: 0.9020000000000001,
      y: 0.45100000000000007,
      z: -1.451,
    },
    {
      id: 'Measurement Point 2',
      x: -16.098,
      y: -8.049,
      z: -1.815,
    },
    {
      id: 'Measurement Point 4',
      x: -0.9660000000000002,
      y: -0.4830000000000001,
      z: -1.361,
    },
  ];
  expect(getConvertedGroundTruthPoints(state)).toEqual(result);
});

const tagBase2 = {
  measureName: 'sensor_data',
  position: {
    x: -0.5274726092280309,
    y: -0.14396243916810192,
    z: -1.1808511304685392,
  },
  los: 'a1a2a3a4',
  error2d: 10,
  error3d: 45,
  batteryLevel: 85,
};

const allTags: Tag[] = [
  {
    ...tagBase2,
    tagId: '1111',
    timestamp: '2025-02-15 12:12:13.000000000',
  },
  {
    ...tagBase2,
    tagId: '1112',
    timestamp: '2025-02-15 12:12:12.000000000',
  },
  {
    ...tagBase2,
    tagId: '1113',
    timestamp: '2025-02-14 12:12:12.000000000',
  },
];

test.each([
  {
    description: 'getTagsFromSelectedInterval - no replay date',
    replayDate: undefined,
    replayTime: undefined,
    expected: allTags,
  },
  {
    description: 'getTagsFromSelectedInterval - no replay time',
    replayDate: dayjs(new Date(2025, 1, 15, 12)),
    replayTime: undefined,
    expected: [allTags[0], allTags[1]],
  },
  {
    description: 'getTagsFromSelectedInterval - with replay time',
    replayDate: dayjs(new Date(2025, 1, 15, 12)),
    replayTime: dayjs(new Date(2025, 1, 15, 12, 12, 12)),
    expected: [allTags[0]],
  },
])('$description', ({ replayDate, replayTime, expected }) => {
  const state: PlanState = {
    ...emptyPlanStore,
    allTags,
    replayDate,
    replayTime,
  };

  expect(getTagsFromSelectedInterval(state)).toEqual(expected);
});

test('getUniqueTagCount', () => {
  const state: PlanState = {
    ...emptyPlanStore,
    allTags: [
      {
        tagId: '1111',
        measureName: 'sensor_data',
        position: {
          x: -0.5274726092280309,
          y: -0.14396243916810192,
          z: -1.1808511304685392,
        },
        los: 'a1a2a3a4',
        error2d: 10,
        error3d: 45,
        batteryLevel: 85,
        timestamp: '1738146250',
      },
      {
        tagId: '1111',
        measureName: 'sensor_data',
        position: {
          x: -0.3274726092280309,
          y: -0.14396243916810192,
          z: -1.1808511304685392,
        },
        los: 'a1a2a3a4',
        error2d: 10,
        error3d: 45,
        batteryLevel: 85,
        timestamp: '1738146250',
      },
      {
        tagId: '1112',
        measureName: 'sensor_data',
        position: {
          x: -0.5274726092280309,
          y: -0.14396243916810192,
          z: -1.1808511304685392,
        },
        los: 'a1a2a3a4',
        error2d: 10,
        error3d: 45,
        batteryLevel: 85,
        timestamp: '1738146250',
      },
    ],
    replayDate: undefined,
  };

  expect(getUniqueTagCount(state)).toEqual(2);
});
