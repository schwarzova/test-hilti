import { Flex } from 'antd';
import { css } from '../../styled-system/css';
import logoSrc from '../assets/logo.svg';
// import { Plan } from '../types';

const menuStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'background.light',
  fontSize: '16px',
  height: '60px',
  marginBottom: '4px',
  boxShadow: '0 -.625rem .625rem .625rem #00000026',
});

function LogoImage() {
  const containerStyle: React.CSSProperties = {
    width: '130px',
    marginRight: '20px',
  };

  const imageStyle: React.CSSProperties = {
    height: '60px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <img src={logoSrc} alt="Company logo" style={imageStyle} />
    </div>
  );
}

// type Props = {
//   onPlanSelect: (plan?: Plan) => void;
//   plans: Plan[];
//   selectedPlan?: Plan;
// };

function TopMenu() {
  // function handleChange(value: string) {
  //   props.onPlanSelect(props.plans.find((p) => p.id === value));
  // }

  return (
    <div className={menuStyles}>
      <Flex align="center">
        <LogoImage />
        Location-aware Tools | Digital Twin
      </Flex>
      {/* {props.plans.length > 0 && (
        <Select
          style={{ width: 200 }}
          onChange={handleChange}
          options={props.plans.map((p) => ({ value: p.id, label: p.name }))}
        />
      )} */}
    </div>
  );
}

export default TopMenu;
