import { Flex } from 'antd';
import { css } from '../../styled-system/css';
import logoSrc from '../assets/logo.svg';

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


function TopMenu() {
  return (
    <div className={menuStyles}>
      <Flex align="center">
        <LogoImage />
        Location-aware Tools | Digital Twin
      </Flex>
      <div>John Doe</div>
    </div>
  );
}

export default TopMenu;
