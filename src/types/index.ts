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
  error2d: number;
  error3d: number;
  batteryLevel: number;
  timestamp: string;
};

export type ReferencePoint = {
  xSvg: number;
  ySvg: number;
  xReal: number;
  yReal: number;
};

export type SvgParsedData = {
  referencePoints: ReferencePoint[];
  originOfTSL: ReferencePoint;
  scale: number;
  angle: number;
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
}