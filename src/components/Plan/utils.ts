import {
  TransformMatrix,
  ReferencePoint,
  SvgParsedData,
  Point,
  TagMap,
} from '../../types';
import { useSidebarStore } from '../Sidebar/store';

export function parseSvg(svgInString: string): null | SvgParsedData {
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgInString, 'image/svg+xml');
  const metadataElement = svgDocument.querySelector('metadata');
  const gcpElements = metadataElement?.querySelectorAll('gcp');

  if (gcpElements) {
    const referencePoints: ReferencePoint[] = Array.from(gcpElements).map(
      (gcp) => ({
        xSvg: Number(gcp.getAttribute('x_svg')!),
        ySvg: Number(gcp.getAttribute('y_svg')!),
        xReal: Number(gcp.getAttribute('x_real')!),
        yReal: Number(gcp.getAttribute('y_real')!),
        xTls: Number(gcp.getAttribute('x_tls')!),
        yTls: Number(gcp.getAttribute('y_tls')!),
      }),
    );

    const realDistance = getRealDistance(
      referencePoints[1],
      referencePoints[2],
    );
    const svgDistance = calculateSvgDistance(
      referencePoints[1],
      referencePoints[2],
    );
    const tlsDistance = calculateTlsDistance(
      referencePoints[1],
      referencePoints[2],
    );

    const scale = realDistance / svgDistance;

    // TLS, SVG points
    const transformMatrix = calculateAffineTransformation(
      [
        { x: referencePoints[0].xTls, y: referencePoints[0].yTls },
        { x: referencePoints[1].xTls, y: referencePoints[1].yTls },
        { x: referencePoints[2].xTls, y: referencePoints[2].yTls },
      ],
      [
        { x: referencePoints[0].xSvg, y: referencePoints[0].ySvg },
        { x: referencePoints[1].xSvg, y: referencePoints[1].ySvg },
        { x: referencePoints[2].xSvg, y: referencePoints[2].ySvg },
      ],
    );

    return {
      referencePoints,
      realDistance,
      svgDistance,
      tlsDistance,
      scale,
      transformMatrix,
    };
  }

  return null;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000; // Radius of Earth in meters
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  // Convert degrees to radians
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Haversine formula
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  const distance = R * c;

  return distance;
}

function calculateSvgDistance(
  pointA: ReferencePoint,
  pointB: ReferencePoint,
): number {
  const dx = pointB.xSvg - pointA.xSvg;
  const dy = pointB.ySvg - pointA.ySvg;

  return Math.sqrt(dx * dx + dy * dy);
}

function calculateTlsDistance(
  pointA: ReferencePoint,
  pointB: ReferencePoint,
): number {
  const dx = pointB.xTls - pointA.xTls;
  const dy = pointB.yTls - pointA.yTls;

  return Math.sqrt(dx * dx + dy * dy);
}

function getRealDistance(pointA: ReferencePoint, pointB: ReferencePoint) {
  return haversineDistance(
    pointA.xReal,
    pointA.yReal,
    pointB.xReal,
    pointB.yReal,
  );
}

function calculateAffineTransformation(
  tlsPoints: [Point, Point, Point],
  svgPoints: [Point, Point, Point],
): [number, number, number, number, number, number] {
  const A = [
    [tlsPoints[0].x, tlsPoints[0].y, 1, 0, 0, 0],
    [0, 0, 0, tlsPoints[0].x, tlsPoints[0].y, 1],
    [tlsPoints[1].x, tlsPoints[1].y, 1, 0, 0, 0],
    [0, 0, 0, tlsPoints[1].x, tlsPoints[1].y, 1],
    [tlsPoints[2].x, tlsPoints[2].y, 1, 0, 0, 0],
    [0, 0, 0, tlsPoints[2].x, tlsPoints[2].y, 1],
  ];

  const B = [
    svgPoints[0].x,
    svgPoints[0].y,
    svgPoints[1].x,
    svgPoints[1].y,
    svgPoints[2].x,
    svgPoints[2].y,
  ];

  // Solution Ax = B
  const T = solveLinearSystem(A, B);

  if (!T) {
    throw new Error('Transform matrix could not be computed');
  }

  return [T[0], T[1], T[2], T[3], T[4], T[5]];
}

function solveLinearSystem(A: number[][], B: number[]): number[] | null {
  const n = B.length;
  const augmentedMatrix = A.map((row, i) => [...row, B[i]]);

  // Gaussian elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (
        Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])
      ) {
        maxRow = k;
      }
    }

    // Swap rows
    [augmentedMatrix[i], augmentedMatrix[maxRow]] = [
      augmentedMatrix[maxRow],
      augmentedMatrix[i],
    ];

    // Normalize pivot row
    const pivot = augmentedMatrix[i][i];
    if (pivot === 0) return null; // No solution
    for (let j = i; j <= n; j++) {
      augmentedMatrix[i][j] /= pivot;
    }

    // Elimination
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = augmentedMatrix[k][i];
      for (let j = i; j <= n; j++) {
        augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
      }
    }
  }

  return augmentedMatrix.map((row) => row[n]);
}

function transformPoint(point: Point, transform: TransformMatrix): Point {
  const [a, b, c, d, e, f] = transform;
  return {
    x: a * point.x + b * point.y + c,
    y: d * point.x + e * point.y + f,
  };
}

export function transformPointWithScale(
  point: Point,
  transformMatrix: TransformMatrix,
  svgScaleX: number,
  svgScaleY: number,
): Point {
  const newPoint = transformPoint(point, transformMatrix);

  const scaleX: number = 1;
  const scaleY: number = 1;
  const offsetX: number = 0;
  const offsetY: number = 0;

  // Scale and offset
  const xTransformed = newPoint.x * svgScaleX * scaleX + offsetX;
  const yTransformed = newPoint.y * svgScaleY * scaleY + offsetY;

  return { x: xTransformed, y: yTransformed };
}

function convertMillisecondsToHoursMinutesSeconds(
  milliseconds: number,
): [number, number, number, number] {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const hoursRest = hours % 24;
  const minutesRest = minutes % 60;
  const secondsRest = seconds % 60;

  return [days, hoursRest, minutesRest, secondsRest];
}

export function getDifferenceTime(
  timeStamp: string,
): [number, number, number, number] {
  const now = new Date().getTime();
  const jsTime = new Date(timeStamp).getTime();

  return convertMillisecondsToHoursMinutesSeconds(now - jsTime);
}

export function findToolForTag(tagId: string) {
  const tools = useSidebarStore.getState().tools;
  const tool = tools.find((t) => t.tagId === tagId);

  return tool;
}

export function convertCmToPx(
  errorCm: number,
  svgDistance: number,
  realDistance: number,
): number {
  const errorMeters = errorCm / 100;
  const scalePxPerMeter = svgDistance / realDistance;

  return errorMeters * scalePxPerMeter;
}

export function convertZToMeters(
  anchorOriginZTls: number,
  zTls: number,
  realDistance: number,
  tlsDistance: number,
) {
  const adjustedZTls = zTls + anchorOriginZTls;
  const scaleMetersPerTls = realDistance / tlsDistance;

  return adjustedZTls * scaleMetersPerTls;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function formatDateTime(
  stringDate: string | number,
  displayDate?: boolean,
  displaySeconds?: boolean,
) {
  const date = new Date(stringDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const time = `${hours}:${minutes}${displaySeconds ? `:${seconds}` : ''}`;
  if (displayDate) {
    return `${day}.${month}.${year}  ${time}`;
  }

  return time;
}

// for debugging

export type StrMap = {
  [tagId: string]: string[];
}

export function mapToString(map: TagMap): StrMap {
  return Object.keys(map).reduce<StrMap>((acc, tagId) => {
    acc[tagId] = map[tagId].map(tag => tag.timestamp);
    return acc;
  }, {})
}