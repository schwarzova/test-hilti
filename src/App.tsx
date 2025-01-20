import { css } from '../styled-system/css';

import reactLogo from './assets/react.svg';

function App() {
  return (
    <>
      <div>
        <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
          Hello 🐼!
        </div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
