// import anchorImg from '../../assets/anchor.png';
import { useState } from 'react';
import { ANCHOR_SIZE } from '../../constants/consts';
import { Anchor } from '../../types';
import { anchorClass, tooltipClass } from './styles';

type Props = {
  anchor: Anchor;
};

function AnchorPoint(props: Props) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const top = props.anchor.y - ANCHOR_SIZE / 2;
  const left = props.anchor.x - ANCHOR_SIZE / 2;

  function handleMouseOver() {
    setTooltipVisible(true);
  }

  function handleMouseOut() {
    setTooltipVisible(false);
  }

  return (
    <>
      <div
        className={anchorClass}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          left: `${left}px`,
          top: `${top}px`,
        }}
      />
      {isTooltipVisible && (
        <div
          className={tooltipClass}
          style={{
            top: top + 10,
            left: left + 10,
          }}
        >
          Id: {props.anchor.id}
        </div>
      )}
    </>
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
