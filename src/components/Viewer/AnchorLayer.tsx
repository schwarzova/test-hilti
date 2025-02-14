import { Anchor, MeasurementPoint, Point, Tag } from '../../types';

import AnchorPoint from './AnchorPoint';
import TagPoint from './TagPoint';
import MeasuredReferencePoint from './MeasuredReferencePoint';
import LinesOfSight from './LinesOfSight';

type Props = {
  anchors: Anchor[];
  enableGroundTruthPoints?: boolean;
  focusedTag?: Tag;
  groundTruthPoints: MeasurementPoint[];
  onSimpleTooltipVisibilityChange: (point?: Point, text?: string) => void;
  onTooltipVisibilityChange: (tag?: Tag) => void;
  showTagImage: boolean;
  tags: Tag[];
};

function AnchorLayer(props: Props) {
  return (
    <>
      {props.anchors.map((a) => (
        <AnchorPoint
          anchor={{ ...a, x: a.x, y: a.y }}
          key={a.id}
          onTooltipVisibilityChange={props.onSimpleTooltipVisibilityChange}
        />
      ))}
      {props.tags.map((tag) => (
        <TagPoint
          key={tag.tagId}
          onTooltipVisibilityChange={props.onTooltipVisibilityChange}
          showTagImage={props.showTagImage}
          tag={tag}
        />
      ))}
      {props.enableGroundTruthPoints &&
        props.groundTruthPoints.map((point) => (
          <MeasuredReferencePoint
            id={point.id}
            isGroundTruthPoint
            key={`${point.x}_${point.y}`}
            onTooltipVisibilityChange={props.onSimpleTooltipVisibilityChange}
            point={point}
          />
        ))}
      {props.focusedTag && (
        <LinesOfSight tag={props.focusedTag} anchors={props.anchors} />
      )}
    </>
  );
}

export default AnchorLayer;
