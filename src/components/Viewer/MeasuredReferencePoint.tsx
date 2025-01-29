import { cx } from '../../../styled-system/css';
import { Point } from '../../types';
import { measuredPointClass, groundTruthPointClass } from './styles';

type Props = {
  point: Point;
  isGroundTruthPoint?: boolean;
};

function MeasuredReferencePoint(props: Props) {
  const top = props.point.y;
  const left = props.point.x;

  return (
    <div
      className={cx(
        measuredPointClass,
        props.isGroundTruthPoint && groundTruthPointClass,
      )}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
}

export default MeasuredReferencePoint;
