import { TAG_SIZE } from '../../constants/consts';
import { Tag } from '../../types';
import { findToolForTag } from '../Plan/utils';
import {
  tagClass,
  tagErrorClass,
  tagImageClass,
  tagLabelClass,
} from './styles';

type Props = {
  tag: Tag;
  onTooltipVisibilityChange: (tag?: Tag) => void;
  showTagImage: boolean;
  displayId?: boolean;
};

function TagPoint(props: Props) {
  const tool = findToolForTag(props.tag.tagId);
  const left = props.tag.position.x - TAG_SIZE / 2;
  const top = props.tag.position.y - TAG_SIZE / 2;

  if (props.showTagImage && tool) {
    return (
      <img
        src={tool.imgUrl}
        alt={tool.name}
        onMouseOver={() => props.onTooltipVisibilityChange(props.tag)}
        onMouseOut={() => props.onTooltipVisibilityChange(undefined)}
        className={tagImageClass}
        style={{
          left: `${left}px`,
          top: `${top}px`,
        }}
      />
    );
  }

  return (
    <div
      onMouseOver={() => props.onTooltipVisibilityChange(props.tag)}
      onMouseOut={() => props.onTooltipVisibilityChange(undefined)}
      className={tagClass}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      {props.displayId && (
        <span className={tagLabelClass}>{props.tag.tagId}</span>
      )}
      {props.tag.error2d && props.tag.error2d > 1 && (
        <div
          className={tagErrorClass}
          style={{
            width: `${TAG_SIZE + props.tag.error2d}px`,
            height: `${TAG_SIZE + props.tag.error2d}px`,
            borderRadius: `${TAG_SIZE + props.tag.error2d}px`,
            borderWidth: `${props.tag.error2d}px`,
          }}
        ></div>
      )}
    </div>
  );
}

export default TagPoint;
