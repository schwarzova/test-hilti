import { useState } from 'react';
import { css } from '../../styled-system/css';
import PlanViewer from '../components/PlanViewer';

const planStyles = css({
  marginLeft: 'basePx',
  width: '80%',
  borderRadius: '10px',
});

const selectBtnStyles = css({
  px: 'basePx',
  py: 'basePy',
  height: '100%',
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'boxBg',
  color: 'boxTitleColor',
  cursor: 'pointer',
  '&:hover': {
    bg: 'boxBgHover',
  },
});

function Plan() {
  const [isPlanSelected, setIsPlanSelected] = useState(false);

  function handlePlanSelect() {
    // todo
    // fetch plans
    // display selection
    setIsPlanSelected(true);
  }

  return (
    <div className={planStyles}>
      {isPlanSelected ? (
        <PlanViewer />
      ) : (
        <button className={selectBtnStyles} onClick={handlePlanSelect}>
          Add Plan
          <div>+</div>
        </button>
      )}
    </div>
  );
}

export default Plan;
