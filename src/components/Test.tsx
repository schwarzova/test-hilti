import { css } from '../../styled-system/css';

const styles = css({
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
});

function Test() {
  return (
    <>
      <div className={styles}>Test</div>
      <div
        className={css({
          fontSize: '4xl',
          fontWeight: 'bold',
          color: 'red.500',
        })}
      >
        Hello 🐼!
      </div>
    </>
  );
}

export default Test;
