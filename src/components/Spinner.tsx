import { css } from '../../styled-system/css';

const wrapStyles = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const spinnerStyles = css({
  animation: 'spin',
  w: '25px',
  h: '25px',
  borderRadius: '4px',
  bg: 'neutral.main',
});

function Spinner() {
  return (
    <div className={wrapStyles}>
      <div className={spinnerStyles} />
    </div>
  );
}

export default Spinner;
