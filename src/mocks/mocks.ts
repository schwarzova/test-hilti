import { Anchor, Plan, Tag, Tool } from '../types';

export const mockedPlans: Plan[] = [
  { id: '3', name: 'Plan with GCS' },
  { id: '1', name: 'Plan pdf' },
  { id: '2', name: 'Plan dwg' },
];

export const mockedAnchors: Anchor[] = [
  {
    id: 'Anchor 1',
    x: -4.399,
    y: 8.023,
    z: 0.243,
  },
  {
    id: 'Anchor 2',
    x: -8.697,
    y: -0.969,
    z: 0.243,
  },
  {
    id: 'Anchor 3',
    x: 9.18,
    y: 1.512,
    z: 0.244,
  },
  {
    id: 'Anchor 4',
    x: 5.329,
    y: -7.704,
    z: 0.241,
  },
  {
    id: 'Anchor 5',
    x: -23.095,
    y: 11.846,
    z: 1.098,
  },
  {
    id: 'Anchor 6',
    x: -27.108,
    y: 25.104,
    z: 0.775,
  },
  {
    id: 'Anchor 7',
    x: -39.866,
    y: 30.367,
    z: 0.997,
  },
  {
    id: 'Anchor 8',
    x: -44.513,
    y: 21.602,
    z: 0.697,
  },
];

export const mockedTags: Tag[] = [
  {
    tagId: '1111',
    position: {
      x: 12.34,
      y: 9.67,
      z: 0.1,
    },
    los: 'a1a4', // (meaning that there is line of sight only with anchors 1 and 4)
    batteryLevel: 19,
    timestamp: '1738013852500', // unix time
  },
];

export const mockedTools: Tool[] = [
  {
    id: 't1',
    tagId: '1111',
    name: 'TE2000 #5',
    imgUrl: '/src/assets/tool1.png',
  },
];
