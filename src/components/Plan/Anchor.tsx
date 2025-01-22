import { css } from '../../../styled-system/css';
import anchorImg from '../../assets/anchor.png';
import { anchorSize } from '../../constants/consts';

type Props = {
  anchorX: number;
  anchorY: number;
};

function Anchor(props: Props) {
  return (
    <img
      src={anchorImg}
      className={css({
        position: 'absolute',
        zIndex: 1,
        height: `${anchorSize}px`,
        width: `${anchorSize}px`,
      })}
      style={{
        left: `calc(${props.anchorX}px - ${anchorSize / 2}px)`,
        top: `calc(${props.anchorY}px - ${anchorSize / 2}px)`,
      }}
      alt="Anchor"
    />
  );
}

export default Anchor;
