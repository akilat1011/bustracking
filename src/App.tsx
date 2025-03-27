import { Bus } from 'lucide-react';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import RouteList from './components/RouteList';
import './styles/main.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Bus size={32} />
          <h1>BusTracker</h1>
        </div>
      </header>
      
      <div className="main-content">
        <div className="left-panel">
          <SearchBar />
          <RouteList />
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;