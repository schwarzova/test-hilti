import { css } from '../styled-system/css';

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';

function App() {
  return (
    <>
      <TopMenu />
      <div className={css({ display: 'flex', px: 'basePx', py: 'basePy' })}>
        <Sidebar />
        <Plan />
      </div>
    </>
  );
}

export default App;
