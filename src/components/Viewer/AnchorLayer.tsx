import { useEffect, useState } from 'react';

import { Anchor, Point, SvgParsedData, Tag } from '../../types';
import AnchorPoint from './AnchorPoint';
import TagPoint from './TagPoint';
import {
  MEASURED_POINTS,
  rotatePoint,
  transformPointWithScale,
} from '../Plan/utils';
import MeasuredReferencePoint from './MeasuredReferencePoint';
import LinesOfSight from './LinesOfSight';

type Props = {
  anchors: Anchor[];
  focusedTag?: Tag;
  onTooltipVisibilityChange: (tag?: Tag) => void;
  parsedSvgData: SvgParsedData;
  showTagImage: boolean;
  svgScaleX: number;
  svgScaleY: number;
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
      MEASURED_POINTS.map((p) =>
        transformPointWithScale(
          p,
          transformMatrix,
          props.svgScaleX,
          props.svgScaleY,
        ),
      ),
    );
  }, [props.anchors, props.tags, props.parsedSvgData]);

  function convertAnchors(anchors: Anchor[], useMatrix: boolean) {
    if (useMatrix && transformMatrix) {
      return anchors.map((a) => {
        const newPoint: Point = transformPointWithScale(
          { x: a.x, y: a.y },
          transformMatrix,
          props.svgScaleX,
          props.svgScaleY,
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
    return tags.map<Tag>((t) => {
      const newPosition = transformPointWithScale(
        { x: t.position.x, y: t.position.y },
        transformMatrix,
        props.svgScaleX,
        props.svgScaleY,
      );

      return {
        ...t,
        position: {
          ...t.position,
          x: newPosition.x,
          y: newPosition.y,
        },
      };
    });
  }

  return (
    <>
      {convertedAnchors.map((a) => (
        <AnchorPoint
          key={a.id}
          anchor={{ ...a, x: a.x, y: a.y }}
          svgScaleX={props.svgScaleX}
        />
      ))}
      {convertedTags.map((tag) => (
        <TagPoint
          key={tag.tagId}
          tag={tag}
          onTooltipVisibilityChange={props.onTooltipVisibilityChange}
          showTagImage={props.showTagImage}
        />
      ))}
      {convertedMeasuredPoints.map((point) => (
        <MeasuredReferencePoint key={`${point.x}_${point.y}`} point={point} />
      ))}
      {props.focusedTag && (
        <LinesOfSight tag={props.focusedTag} anchors={convertedAnchors} />
      )}
    </>
  );
}

export default AnchorLayer;
