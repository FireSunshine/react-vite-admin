import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import './App.css';
import s from './style.module.less';
import styled from '@emotion/styled';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className={s.index}>
        <span>样式</span>
      </div>
      <Container />
      <div>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src="/vite.svg" />
        </a>
        <a href="https://reactjs.org" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

const Container = styled.div`
  width: 200px;
  height: 200px;
  background-color: skyblue;
  float: left;
`;

export default App;
