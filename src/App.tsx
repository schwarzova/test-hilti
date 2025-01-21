import { css } from '../styled-system/css';

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';

function App() {
  return (
    <>
      <TopMenu />
      <div
        className={css({
          display: 'flex',
          px: 'basePx',
          py: 'basePy',
          // 45px is height of top menu
          height: '[calc(100vh - 45px)]',
        })}
      >
        <Sidebar />
        <Plan />
      </div>
    </>
  );
}

export default App;
