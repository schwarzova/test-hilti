import { TAG_SIZE } from "../../constants/consts";
import { Tag } from "../../types";
import { tagClass } from "./styles";

type Props = {
  tag: Tag;
};

function TagPoint(props: Props) {
  const left = props.tag.position.x - (TAG_SIZE/2);
  const top = props.tag.position.y - (TAG_SIZE/2);

  return (
    <div
      className={tagClass}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
}

export default TagPoint;
