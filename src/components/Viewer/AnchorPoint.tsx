// import anchorImg from '../../assets/anchor.png';
import { ANCHOR_SIZE } from "../../constants/consts";
import { Anchor } from "../../types";
import { anchorClass } from "./styles";

type Props = {
  anchor: Anchor;
};

function AnchorPoint(props: Props) {
  return (
    <div
      className={anchorClass}
      style={{
        left: `${props.anchor.x - (ANCHOR_SIZE/2)}px`,
        top: `${props.anchor.y - (ANCHOR_SIZE/2)}px`,
      }}
    />
  );

  // prepared for the image rendering (for debugging it is better to see points)
  // return (
  //   <img
  //     src={anchorImg}
  //     className={css({
  //       position: 'absolute',
  //       zIndex: 1,
  //       height: `${ANCHOR_SIZE}px`,
  //       width: `${ANCHOR_SIZE}px`,
  //     })}
  //     style={{
  //       left: `calc(${props.anchor.x}px - ${ANCHOR_SIZE / 2}px)`,
  //       top: `calc(${props.anchor.y}px - ${ANCHOR_SIZE / 2}px)`,
  //     }}
  //     alt="Anchor"
  //   />
  // );
}

export default AnchorPoint;
