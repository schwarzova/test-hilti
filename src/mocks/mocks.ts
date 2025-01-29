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

/* eslint-disable no-loss-of-precision */

export const mockedTags1: Tag[] = [
  {
    tagId: '1111',
    position: {
      x: -0.5110425320785901,
      y: -0.12287860453565639,
      z: -1.2040414322618493,
    },
    error2d: 10,
    error3d: 40,
    los: 'a1a2a3a4',
    batteryLevel: 85,
    timestamp: '1738146249',
  },
  {
    tagId: '2222',
    position: {
      x: -0.5274726092280309,
      y: -0.14396243916810192,
      z: -1.1808511304685392,
    },
    los: 'a1a2a3a4',
    error2d: 13,
    error3d: 45,
    batteryLevel: 85,
    timestamp: '1738146250',
  },
  {
    tagId: '3333',
    position: {
      x: -0.5255643229410668,
      y: -0.08378042425439332,
      z: -1.2080846404861073,
    },
    los: 'a1a2a3a4',
    error2d: 8,
    error3d: 36,
    batteryLevel: 85,
    timestamp: '1738146251',
  },
];

export const mockedTags2: Tag[] = [
  {
    tagId: '1111',
    position: {
      x: -0.5274726092280309,
      y: -0.14396243916810192,
      z: -1.1808511304685392,
    },
    error2d: 11,
    error3d: 19,
    los: 'a1a2a3a4',
    batteryLevel: 85,
    timestamp: '1738146250',
  },
  {
    tagId: '2222',
    position: {
      x: -8.23502907812362,
      y: -0.7821089068416865,
      z: -1.6871791128552263,
    },
    los: 'a1a2a3a4',
    error2d: 10,
    error3d: 19,
    batteryLevel: 85,
    timestamp: '1738146350',
  },
  {
    tagId: '3333',
    position: {
      x: -8.240016412089021,
      y: -0.7835736929520743,
      z: -1.6479335364263972,
    },
    los: 'a1a2a3a4',
    error2d: 10,
    error3d: 23,
    batteryLevel: 85,
    timestamp: '1738146351',
  },
];

export const mockedTags3: Tag[] = [
  {
    tagId: '1111',
    position: {
      x: -3.8026854,
      y: 0.4318713,
      z: -4.58586295,
    },
    error2d: 153,
    error3d: 257,
    los: 'a1a2a3a4',
    batteryLevel: 85,
    timestamp: '1738146360',
  },
  {
    tagId: '2222',
    position: {
      x: -3.4339728,
      y: 1.9534661,
      z: -1.4373713,
    },
    los: 'a1a2a4',
    error2d: 7,
    error3d: 10,
    batteryLevel: 85,
    timestamp: '1738146361',
  },
  {
    tagId: '3333',
    position: {
      x: -4.3321433,
      y: -2.0508021,
      z: -6.6383143,
    },
    los: 'a1a4',
    error2d: 407,
    error3d: 663,
    batteryLevel: 85,
    timestamp: '1738146362',
  },
];

export const mockedTools: Tool[] = [
  {
    id: 't1',
    tagId: '1111',
    name: 'Tool 1111',
    imgUrl: '/src/assets/tool1.png',
  },
  {
    id: 't2',
    tagId: '2222',
    name: 'Tool 2222',
    imgUrl: '/src/assets/tool2.png',
  },
  {
    id: 't3',
    tagId: '3333',
    name: 'Tool 3333',
    imgUrl: '/src/assets/tool3.png',
  },
];
