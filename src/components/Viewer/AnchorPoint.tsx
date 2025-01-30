// import anchorImg from '../../assets/anchor.png';
import { ANCHOR_SIZE } from '../../constants/consts';
import { Anchor, Point } from '../../types';
import { anchorClass, anchorLabelClass } from './styles';

type Props = {
  anchor: Anchor;
  onTooltipVisibilityChange: (point?: Point, text?: string) => void;
  displayId?: boolean;
};

function AnchorPoint(props: Props) {
  const top = props.anchor.y - ANCHOR_SIZE / 2;
  const left = props.anchor.x - ANCHOR_SIZE / 2;

  function handleMouseOver() {
    props.onTooltipVisibilityChange({ x: left, y: top }, props.anchor.id);
  }

  function handleMouseOut() {
    props.onTooltipVisibilityChange();
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
      {props.displayId && (
        <span
          className={anchorLabelClass}
          style={{
            top: top + 5,
            left: left + 5,
          }}
        >
          {props.anchor.id.split(' ')[1]}
        </span>
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
