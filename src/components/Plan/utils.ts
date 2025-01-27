import {
  TransformMatrix,
  ReferencePoint,
  SvgParsedData,
  Point,
} from '../../types';

// firstly defined
const TLS_0: Point = { x: -45.56, y: 20.35 }; // [0]
const TLS_1: Point = { x: -33.64, y: 9.98 }; // south [1]

// adjusted sligthly
//  const TLS_0: Point ={ x: -45.549, y: 20.338 }; // [0]
//  const TLS_1: Point = { x: -33.627, y: 9.965 }; // south [1]

export const MEASURED_POINTS: Point[] = [TLS_0, TLS_1, { x: 0, y: 0 }];

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
      }),
    );

    const realDistance = getRealDistance(
      referencePoints[1],
      referencePoints[2],
    );
    const svgDistance = calculateDistance(
      referencePoints[1],
      referencePoints[2],
    );

    const angle = calculateAngle(
      referencePoints[0],
      referencePoints[2],
      referencePoints[1],
    );
    const scale = realDistance / svgDistance;

    // console.log('Real distance in meters:', realDistance.toFixed(2));
    // console.log('Svg distance', svgDistance.toFixed(2));
    console.log('Scale', scale);

    // TLS, SVG points
    const transformMatrix = calculateAffineTransformation(
      [TLS_0, TLS_1, { x: 0, y: 0 }],
      [
        { x: referencePoints[0].xSvg, y: referencePoints[0].ySvg },
        { x: referencePoints[1].xSvg, y: referencePoints[1].ySvg },
        { x: referencePoints[2].xSvg, y: referencePoints[2].ySvg },
      ],
    );

    return {
      referencePoints,
      originOfTSL: referencePoints[0],
      scale,
      angle,
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

function calculateDistance(
  pointA: ReferencePoint,
  pointB: ReferencePoint,
): number {
  const dx = pointB.xSvg - pointA.xSvg;
  const dy = pointB.ySvg - pointA.ySvg;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculateAngle(
  pointA: ReferencePoint,
  pointB: ReferencePoint,
  pointC: ReferencePoint,
): number {
  // Vectors BA a BC
  const vectorBA = {
    x: pointA.xSvg - pointB.xSvg,
    y: pointA.ySvg - pointB.ySvg,
  };
  const vectorBC = {
    x: pointC.xSvg - pointB.xSvg,
    y: pointC.ySvg - pointB.ySvg,
  };

  // dot product BA a BC
  const dotProduct = vectorBA.x * vectorBC.x + vectorBA.y * vectorBC.y;

  // Size of vectors BA a BC
  const magnitudeBA = Math.sqrt(
    vectorBA.x * vectorBA.x + vectorBA.y * vectorBA.y,
  );
  const magnitudeBC = Math.sqrt(
    vectorBC.x * vectorBC.x + vectorBC.y * vectorBC.y,
  );

  // Cos angle
  const cosTheta = dotProduct / (magnitudeBA * magnitudeBC);

  // angle in radians
  const angleRadians = Math.acos(Math.max(-1, Math.min(1, cosTheta)));

  // change to degrees
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return angleDegrees;
}

export function rotatePoint(
  point: Point,
  center: Point,
  angleDegrees: number,
): Point {
  // Convert degrees to radians
  const angleRadians = (angleDegrees * Math.PI) / 180;

  // Translate point, to center of rotation
  const translatedX = point.x - center.x;
  const translatedY = point.y - center.y;

  // Rotation matrix
  const rotatedX =
    translatedX * Math.cos(angleRadians) - translatedY * Math.sin(angleRadians);
  const rotatedY =
    translatedX * Math.sin(angleRadians) + translatedY * Math.cos(angleRadians);

  // Translate point back
  return {
    x: rotatedX + center.x,
    y: rotatedY + center.y,
  };
}

export function getRealDistance(
  pointA: ReferencePoint,
  pointB: ReferencePoint,
) {
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

export function transformPoint(
  point: Point,
  transform: TransformMatrix,
): Point {
  const [a, b, c, d, e, f] = transform;
  return {
    x: a * point.x + b * point.y + c,
    y: d * point.x + e * point.y + f,
  };
}

export function transformPoint2(
  point: Point,
  transform: TransformMatrix,
  scale: number = 0.85,
  scaleY: number = 0.7,
  offsetX: number = 80,
  offsetY: number = 80,
): Point {
  const transformedPoint = transformPoint(point, transform);

  // Scale and offset
  const xTransformed = transformedPoint.x * scale + offsetX;
  const yTransformed = transformedPoint.y * scaleY + offsetY;

  return rotatePoint({ x: xTransformed, y: yTransformed }, { x: 0, y: 0 }, -1);
}
