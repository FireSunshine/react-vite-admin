import { HashRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Dashboard />
      </div>
    </HashRouter>
  );
}

export default App;
