import { css } from '../styled-system/css';

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';
import { topMenuHeight } from './constants/consts';

function App() {
  return (
    <>
      <TopMenu />
      <div
        className={css({
          display: 'flex',
          px: 'basePx',
          py: 'basePy',
          height: `calc(100vh - ${topMenuHeight})`,
        })}
      >
        <Sidebar />
        <Plan />
      </div>
    </>
  );
}

export default App;
