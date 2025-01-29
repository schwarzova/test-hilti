import { cx } from '../../../styled-system/css';
import { Point } from '../../types';
import {
  measuredPointClass,
  groundTruthPointClass,
  measuredPointLabelClass,
} from './styles';

type Props = {
  point: Point;
  isGroundTruthPoint?: boolean;
  id?: string;
};

function MeasuredReferencePoint(props: Props) {
  const top = props.point.y;
  const left = props.point.x;

  return (
    <>
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
      {props.id && (
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
