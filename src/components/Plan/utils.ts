import { Point, ReferencePoint, SvgParsedData } from '../../types';

const TLS_0 : ReferencePoint = {xSvg:-45.560, ySvg: 20.350, xReal: -1, yReal: -1};
const TLS_1 : ReferencePoint = {xSvg:-33.640, ySvg: 9.980, xReal: -1, yReal: -1}; // south

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

    const tlsDistance = calculateDistance(
        TLS_1,
        referencePoints[2],
      );

    const angle = calculateAngle(
        referencePoints[0],
      referencePoints[2],
      referencePoints[1],
    );
    // const scale = realDistance / svgDistance;
    const scale = realDistance / tlsDistance;

    // console.log('Real distance in meters:', realDistance.toFixed(2));
    // console.log('Svg distance', svgDistance.toFixed(2));
    console.log('Tls distance', tlsDistance.toFixed(2));
    console.log('Scale', scale);
    // console.log('Angle is', angle.toFixed(2));

    return { referencePoints, originOfTSL: referencePoints[2], scale, angle };
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
