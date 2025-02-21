import { css } from '../styled-system/css';
import { ConfigProvider } from 'antd';

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';
import { useEffect } from 'react';
import { usePlanStore } from './components/Plan/store';

const theme = {
  token: {
    colorPrimary: 'text.primary',
  },
};

function App() {
  const closeTagsSocket = usePlanStore((state) => state.disconnectFetchTags);
  const changePlanMode = usePlanStore((state) => state.changePlanMode);

  useEffect(
    () => () => {
      closeTagsSocket();
      changePlanMode(undefined);
    },
  );

  return (
    <ConfigProvider theme={theme}>
      <TopMenu />
      <div
        className={css({
          display: 'flex',
          px: 'basePx',
          py: 'basePy',
          // 60px is height of top menu
          height: '[calc(100vh - 60px)]',
        })}
      >
        <Sidebar />
        <Plan />
      </div>
    </ConfigProvider>
  );
}

export default App;
