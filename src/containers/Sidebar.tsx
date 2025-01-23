import { css } from '../../styled-system/css';

const sidebarStyles = css({
  width: '20%',
  display: 'flex',
  flexDir: 'column',
});

const sidebarBoxStyles = css({
  flex: '1',
  mb: 'basePy',
  px: 'basePx',
  py: 'basePy',
  backgroundColor: 'boxBg',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'text.primary',
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
