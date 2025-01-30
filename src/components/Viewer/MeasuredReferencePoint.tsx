import { cx } from '../../../styled-system/css';
import { Point } from '../../types';
import {
  measuredPointClass,
  groundTruthPointClass,
  measuredPointLabelClass,
} from './styles';

type Props = {
  displayId?: boolean;
  id?: string;
  isGroundTruthPoint?: boolean;
  onTooltipVisibilityChange?: (point?: Point, text?: string) => void;
  point: Point;
};

function MeasuredReferencePoint(props: Props) {
  const top = props.point.y;
  const left = props.point.x;

  function handleMouseOver() {
    if (props.id) {
      props.onTooltipVisibilityChange?.({ x: left, y: top }, props.id);
    }
  }

  function handleMouseOut() {
    props.onTooltipVisibilityChange?.();
  }

  return (
    <>
      <div
        className={cx(
          measuredPointClass,
          props.isGroundTruthPoint && groundTruthPointClass,
        )}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          left: `${left}px`,
          top: `${top}px`,
        }}
      />
      {props.displayId && props.id && (
        <span
          className={measuredPointLabelClass}
          style={{ top: top + 5, left: left + 5 }}
        >
          {props.id.split(' ')[2]}
        </span>
      )}
    </>
  );
}

export default MeasuredReferencePoint;
