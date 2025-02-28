import {
  Anchor,
  MeasurementPoint,
  Plan,
  Tool,
  PlanAnchorsMap,
  Task,
} from '../types';

// svg has to be stored in public folder
// id has to be the same that is in database (column jobsite)
export const mockedPlans: Plan[] = [
  { id: 'TradeHall', name: 'Trade hall', url: 'floorplan.svg' },
  { id: 'CreativeRoom', name: 'Creative room', url: 'creativeRoom.svg' },
  { id: 'opticslab', name: 'Optics lab', url: 'opticsLab.svg' },
];

export const mockedAnchors: Anchor[] = [
  {
    id: 'Anchor 1',
    x: 5.33079957962,
    y: -7.705016136169,
    z: 0.240420818329,
  },
  {
    id: 'Anchor 2',
    x: 9.180229187012,
    y: 1.512094378471,
    z: 0.242211043835,
  },
  {
    id: 'Anchor 3',
    x: -4.398401260376,
    y: 8.022876739502,
    z: 0.241140887141,
  },
  {
    id: 'Anchor 4',
    x: -8.698121070862,
    y: -0.969426512718,
    z: 0.241051599383,
  },
  {
    id: 'Anchor 5',
    x: -23.09515953064,
    y: 11.84673500061,
    z: 1.094669342041,
  },
  {
    id: 'Anchor 6',
    x: -27.106979370117,
    y: 25.103958129883,
    z: 0.775694608688,
  },
  {
    id: 'Anchor 7',
    x: -39.865760803223,
    y: 30.366039276123,
    z: 0.994159817696,
  },
  {
    id: 'Anchor 8',
    x: -44.513031005859,
    y: 21.601758956909,
    z: 0.69482254982,
  },
];

const mockedAnchors2: Anchor[] = [
  {
    id: 'Anchor 1',
    x: 0,
    y: 0,
    z: 2,
  },
  {
    id: 'Anchor 2',
    x: 0,
    y: 8,
    z: 2,
  },
  {
    id: 'Anchor 3',
    x: -8,
    y: 8,
    z: 2,
  },
  {
    id: 'Anchor 4',
    x: -8,
    y: 0,
    z: 2,
  },
];

const mockedAnchors3: Anchor[] = [
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
  {
    id: 'Anchor 3',
    x: 0,
    y: 7.5,
    z: 2,
  },
  {
    id: 'Anchor 4',
    x: -4.5,
    y: 7.5,
    z: 2,
  },
];

export const PLAN_ANCHORS_MOCKED_MAP: PlanAnchorsMap = {
  TradeHall: mockedAnchors,
  CreativeRoom: mockedAnchors2,
  opticslab: mockedAnchors3,
};

// These are the tools displayed for image, change the imgUrl and place the image in /assets/ folder
export const MOCKED_TOOLS: Tool[] = [
  {
    id: 't2',
    tagId: '1112',
    name: 'Cordless rotary hammer',
    imgUrl: '/assets/tool2.png',
    order: '#6',
    runTime: '25 min',
    model: 'TE 6-22',
  },
  {
    id: 't3',
    tagId: '1113',
    name: 'Cordless oscillating multi tool',
    imgUrl: '/assets/tool3.png',
    order: '#2',
    runTime: '11 min',
    model: 'SMT 6-22',
  },
  {
    id: 't1',
    tagId: '1111',
    name: 'Cordless jackhammer',
    imgUrl: '/assets/tool1.png',
    runTime: '1h 26 min',
    order: '#5',
    model: 'TE 2000-22',
  },
];

// This is what is rendered in sidebar top panel (Tasks)
export const MOCKED_TASKS: Task[] = [
  {
    id: 'task1',
    name: 'Pipe installation',
    place: 'Room 1',
    completion: 15, // in percentage
  },
  {
    id: 'task2',
    name: 'Pipe installation',
    place: 'Room 2',
    completion: 19,
  },
  {
    id: 'task3',
    name: 'Pipe installation',
    place: 'Hall',
    completion: 70,
  },
  {
    id: 'task4',
    name: 'Pipe installation',
    place: 'Room 3',
    completion: 90,
  },
];

export const GROUND_TRUTH_POINTS: MeasurementPoint[] = [
  {
    id: 'Measurement Point 1',
    x: -0.483,
    y: -0.066,
    z: -1.451,
  },
  {
    id: 'Measurement Point 2',
    x: -8.182,
    y: -0.867,
    z: -1.815,
  },
  {
    id: 'Measurement Point 4',
    x: -3.386,
    y: 1.903,
    z: -1.361,
  },
];
