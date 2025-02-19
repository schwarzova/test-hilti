import { css } from '../styled-system/css';
import { ConfigProvider } from "antd";

import TopMenu from './containers/TopMenu';
import Sidebar from './containers/Sidebar';
import Plan from './containers/Plan';


const theme = {
  token: {
    colorPrimary: "text.primary",
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <TopMenu />
      <div
        className={css({
          display: 'flex',
          px: 'basePx',
          py: 'basePy',
          // 64px is height of top menu
          height: '[calc(100vh - 64px)]',
        })}
      >
        <Sidebar />
        <Plan />
      </div>
      </ConfigProvider>
  );
}

export default App;
