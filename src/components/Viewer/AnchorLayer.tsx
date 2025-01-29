import { Anchor, Point, Tag } from '../../types';

import AnchorPoint from './AnchorPoint';
import TagPoint from './TagPoint';
import MeasuredReferencePoint from './MeasuredReferencePoint';
import LinesOfSight from './LinesOfSight';

type Props = {
  anchors: Anchor[];
  focusedTag?: Tag;
  measuredPoints: Point[];
  onTooltipVisibilityChange: (tag?: Tag) => void;
  showTagImage: boolean;
  tags: Tag[];
};

function AnchorLayer(props: Props) {
  return (
    <>
      {props.anchors.map((a) => (
        <AnchorPoint key={a.id} anchor={{ ...a, x: a.x, y: a.y }} />
      ))}
      {props.tags.map((tag) => (
        <TagPoint
          key={tag.tagId}
          tag={tag}
          onTooltipVisibilityChange={props.onTooltipVisibilityChange}
          showTagImage={props.showTagImage}
        />
      ))}
      {props.measuredPoints.map((point) => (
        <MeasuredReferencePoint key={`${point.x}_${point.y}`} point={point} />
      ))}
      {props.focusedTag && (
        <LinesOfSight tag={props.focusedTag} anchors={props.anchors} />
      )}
    </>
  );
}

export default AnchorLayer;
