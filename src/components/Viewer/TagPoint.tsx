import { useState } from "react";
import { TAG_SIZE } from "../../constants/consts";
import { Tag } from "../../types";
import { tagClass } from "./styles";

type Props = {
  tag: Tag;
};

function TagPoint(props: Props) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const left = props.tag.position.x - TAG_SIZE / 2;
  const top = props.tag.position.y - TAG_SIZE / 2;

  function handleMouseOver() {
    setTooltipVisible(true);
  }

  function handleMouseOut() {
    setTooltipVisible(false);
  }

  return (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={tagClass}
        style={{
          left: `${left}px`,
          top: `${top}px`,
        }}
      />

      {isTooltipVisible && (
        <div
          style={{
            position: "absolute",
            top: top + 10, // Offset to avoid overlap
            left: left + 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            pointerEvents: "none", // Prevents tooltip from interfering with SVG interactions
          }}
        >
          Battery level: {props.tag.batteryLevel}%
        </div>
      )}
    </>
  );
}

export default TagPoint;
