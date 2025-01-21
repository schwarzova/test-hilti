export type Plan = { id: string; name: string };

export type Anchor = {
  id: string;
  x: number;
  y: number;
  z: number;
};

export type Tag = {
  tagId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  los: string;
  batteryLevel: number;
  timestamp: string;
};

export type Point2d = {
  x: number;
  y: number;
};
