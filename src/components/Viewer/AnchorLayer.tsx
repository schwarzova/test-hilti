import { useEffect, useState } from "react";

import { Anchor, Point, Tag } from "../../types";
// import { rotatePoint } from "../Plan/utils";
import AnchorPoint from "./AnchorPoint";
import TagPoint from "./TagPoint";

type Props = {
  anchors: Anchor[];
  scale: number;
  originPoint: Point;
  tags: Tag[];
};

function AnchorLayer(props: Props) {
  const [convertedAnchors, setConvertedAnchors] = useState<Anchor[]>([]);

  const tags: Tag[] = props.tags.map<Tag>((t) => ({
    ...t,
    position: {
      ...t.position,
      x: t.position.x / 0.1 + props.originPoint.x,
      y: t.position.y / 0.1 + props.originPoint.y,
    },
  }));

  useEffect(() => {
    setConvertedAnchors(convertAnchors(props.anchors));
  }, [props.anchors]);

  function convertAnchors(anchors: Anchor[]) {
    // scale
    const newAnchors = anchors.map((a) => ({
      ...a,
      x: a.x / 0.1 + props.originPoint.x,
      y: a.y / 0.1 + props.originPoint.y,
    }));

    // rotate
    //  newAnchors = newAnchors.map((a) => {
    //   const newPoint = rotatePoint(
    //     { x: a.x, y: a.y },
    //     { x: props.originPoint.x, y: props.originPoint.y },
    //     205
    //   );

    //   return {
    //     ...a,
    //     x: newPoint.x,
    //     y: newPoint.y,
    //   };
    // });

    // translate

    return newAnchors;
  }

  return (
    <>
      {convertedAnchors.map((a) => (
        <AnchorPoint key={a.id} anchor={{ ...a, x: a.x, y: a.y }} />
      ))}
      {tags.map((tag) => (
        <TagPoint key={tag.tagId} tag={tag} />
      ))}
    </>
  );
}

export default AnchorLayer;
