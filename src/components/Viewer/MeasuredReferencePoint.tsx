import { Point } from '../../types';
import { measuredPointClass } from './styles';

type Props = {
  point: Point;
};

function MeasuredReferencePoint(props: Props) {
  const top = props.point.y;
  const left = props.point.x;

  return (
    <div
      className={measuredPointClass}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
}

export default MeasuredReferencePoint;
