import { TAG_SIZE } from '../../constants/consts';
import { Tag } from '../../types';
import { findToolForTag } from '../Plan/utils';
import { tagClass, tagImageClass } from './styles';

type Props = {
  tag: Tag;
  onTooltipVisibilityChange: (tag?: Tag) => void;
  showTagImage: boolean;
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
    />
  );
}

export default TagPoint;
