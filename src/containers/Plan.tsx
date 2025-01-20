import { css } from '../../styled-system/css';

const planStyles = css({
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'basePx',
  px: 'basePx',
  py: 'basePy',
  width: '80%',
  backgroundColor: 'boxBg',
  borderRadius: '10px',
  color: 'boxTitleColor',
  cursor: 'pointer',
  '&:hover': {
    bg: 'boxBgHover',
  },
});

function Plan() {
  function handlePlanSelect() {}

  return (
    <button className={planStyles} onClick={handlePlanSelect}>
      Add Plan
      <div>+</div>
    </button>
  );
}

export default Plan;
