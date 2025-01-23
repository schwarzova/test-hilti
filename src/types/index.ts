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
};

export type Point = {
  x: number;
  y: number;
}