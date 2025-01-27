import { useEffect, useState } from 'react';

import { Anchor, Point, SvgParsedData, Tag } from '../../types';
import AnchorPoint from './AnchorPoint';
import TagPoint from './TagPoint';
import { MEASURED_POINTS, rotatePoint, transformPoint } from '../Plan/utils';
import MeasuredReferencePoint from './MeasuredReferencePoint';

type Props = {
  anchors: Anchor[];
  parsedSvgData: SvgParsedData;
  tags: Tag[];
};

function AnchorLayer(props: Props) {
  const [convertedAnchors, setConvertedAnchors] = useState<Anchor[]>([]);
  const [convertedTags, setConvertedTags] = useState<Tag[]>([]);
  const [convertedMeasuredPoints, setConvertedMeasuredPoints] = useState<
    Point[]
  >([]);

  const { transformMatrix, originOfTSL, scale } = props.parsedSvgData;
  const originPoint: Point = {
    x: originOfTSL.xSvg,
    y: originOfTSL.ySvg,
  };

  useEffect(() => {
    const c = convertTags(props.tags);
    setConvertedAnchors(convertAnchors(props.anchors, true));
    setConvertedTags(c);
    setConvertedMeasuredPoints(
      MEASURED_POINTS.map((p) => transformPoint(p, transformMatrix)),
    );
  }, [props.anchors, props.tags, props.parsedSvgData]);

  function convertAnchors(anchors: Anchor[], useMatrix: boolean) {
    if (useMatrix && transformMatrix) {
      return anchors.map((a) => {
        const newPoint: Point = transformPoint(
          { x: a.x, y: a.y },
          transformMatrix,
        );

        return { ...a, x: newPoint.x, y: newPoint.y };
      });
    }

    const flippedAnchors = anchors.map((a) => ({ ...a, y: 0 - a.y }));

    // scale
    let newAnchors = flippedAnchors.map((a) => ({
      ...a,
      x: a.x / scale + originPoint.x,
      y: a.y / scale + originPoint.y,
    }));

    // rotate
    newAnchors = newAnchors.map<Anchor>((a) => {
      const newPoint = rotatePoint(
        { x: a.x, y: a.y },
        { x: originPoint.x, y: originPoint.y },
        -22,
      );

      return {
        ...a,
        x: newPoint.x,
        y: newPoint.y,
      };
    });

    // translate

    return newAnchors;
  }

  function convertTags(tags: Tag[]): Tag[] {
    return tags.map<Tag>((t) => ({
      ...t,
      position: {
        ...t.position,
        x: t.position.x / 0.1 + originPoint.x,
        y: t.position.y / 0.1 + originPoint.y,
      },
    }));
  }

  return (
    <>
      {convertedAnchors.map((a) => (
        <AnchorPoint key={a.id} anchor={{ ...a, x: a.x, y: a.y }} />
      ))}
      {convertedTags.map((tag) => (
        <TagPoint key={tag.tagId} tag={tag} />
      ))}
      {convertedMeasuredPoints.map((point) => (
        <MeasuredReferencePoint key={`${point.x}_${point.y}`} point={point} />
      ))}
    </>
  );
}

export default AnchorLayer;
