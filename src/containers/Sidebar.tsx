import { css } from '../../styled-system/css';

const sidebarStyles = css({
  width: '20%',
});

const sidebarBoxStyles = css({
  mb: 'basePy',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'boxBg',
  minH: '200px',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'boxTitleColor',
  _last: { mb: 0 },
});

function Sidebar() {
  function renderSidebarBox(title: string) {
    return (
      <div className={sidebarBoxStyles}>
        <h3>{title}</h3>
      </div>
    );
  }

  return (
    <div className={sidebarStyles}>
      {renderSidebarBox('Tasks')}
      {renderSidebarBox('Available Tools')}
      {renderSidebarBox('Daily runtime')}
    </div>
  );
}

export default Sidebar;
