import { useEffect, useState } from "react";

import { Anchor, Point, Tag } from "../../types";
import AnchorPoint from "./AnchorPoint";
import TagPoint from "./TagPoint";
import { rotatePoint } from "../Plan/utils";

type Props = {
  anchors: Anchor[];
  scale: number;
  originPoint: Point;
  tags: Tag[];
};

function AnchorLayer(props: Props) {
  const [convertedAnchors, setConvertedAnchors] = useState<Anchor[]>([]);
  const [convertedTags, setConvertedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const c = convertTags(props.tags);
    setConvertedAnchors(convertAnchors(props.anchors));
    setConvertedTags(c);
  }, [props.anchors, props.tags, props.originPoint]);

  function convertAnchors(anchors: Anchor[]) {
    // scale
    let newAnchors = anchors.map((a) => ({
      ...a,
      x: a.x / 0.1 + props.originPoint.x,
      y: a.y / 0.1 + props.originPoint.y,
    }));

    // rotate
    newAnchors = newAnchors.map<Anchor>((a) => {
      const newPoint = rotatePoint(
        { x: a.x, y: a.y },
        { x: props.originPoint.x, y: props.originPoint.y },
        0
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
        x: t.position.x / 0.1 + props.originPoint.x,
        y: t.position.y / 0.1 + props.originPoint.y,
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
    </>
  );
}

export default AnchorLayer;
