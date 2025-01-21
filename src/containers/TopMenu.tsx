import { css } from '../../styled-system/css';
import hiltiLogo from '../assets/hilti-logo.png';
import { topMenuHeight } from '../constants/consts';

const menuStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'boxBg',
  fontSize: '16px',
  height: topMenuHeight,
});

const logoStyles = css({
  marginRight: '10px',
});

function TopMenu() {
  return (
    <div className={menuStyles}>
      <div className={css({ display: 'flex' })}>
        <img src={hiltiLogo} alt="Hilti logo" className={logoStyles} />
        Location-aware Tools | Digital Twin
      </div>
      <div>John Doe</div>
    </div>
  );
}

export default TopMenu;
