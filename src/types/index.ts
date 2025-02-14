export type Plan = { id: string; name: string; url: string };

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
  error2d: number;
  error3d: number;
  batteryLevel: number;
  timestamp: string;
  measureName: string;
};

export type ReferencePoint = {
  xSvg: number;
  ySvg: number;
  xReal: number;
  yReal: number;
  xTls: number;
  yTls: number;
};

export type PlanAnchorsMap = {
  [planId: string]: Anchor[];
};

export type SvgParsedData = {
  referencePoints: ReferencePoint[];
  realDistance: number;
  svgDistance: number;
  tlsDistance: number;
  scale: number;
  transformMatrix: TransformMatrix;
};

export type Point = {
  x: number;
  y: number;
};

export type Tool = {
  id: string;
  tagId: string;
  name: string;
  imgUrl: string;
};

export type TransformMatrix = [number, number, number, number, number, number];

export type MeasurementPoint = Point & { id: string; z: number };

export type SimpleTooltip = {
  point: Point;
  text: string;
};
