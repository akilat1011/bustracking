import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import RouteList from './components/RouteList';
import WelcomePage from './pages/WelcomePage';
import './styles/main.css';



// Static bus routes data
const busRoutes = [
  {
    id: 1,
    name: 'Chennai - Madurai Express',
    duration: '8 hours',
    stops: ['Chennai', 'Villupuram', 'Trichy', 'Madurai'],
    price: '₹450',
    coordinates: [
      [13.0827, 80.2707],
      [11.9401, 79.4861],
      [10.7905, 78.7047],
      [9.9252, 78.1198]
    ]
  },
  {
    id: 2,
    name: 'Coimbatore - Salem Express',
    duration: '4 hours',
    stops: ['Coimbatore', 'Tiruppur', 'Erode', 'Salem'],
    price: '₹250',
    coordinates: [
      [11.0168, 76.9558],
      [11.1085, 77.3411],
      [11.3410, 77.7172],
      [11.6643, 78.1460]
    ]
  },
  {
    id: 3,
    name: 'Madurai - Rameswaram Special',
    duration: '5 hours',
    stops: ['Madurai', 'Ramanathapuram', 'Rameswaram'],
    price: '₹300',
    coordinates: [
      [9.9252, 78.1198],
      [9.3639, 78.8395],
      [9.2876, 79.3129]
    ]
  }
];

function Dashboard({ user, onLogout }) {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleSearch = ({ from, to }) => {
    // Search for routes where both `from` and `to` exist in stops
    const matchingRoute = busRoutes.find(route => 
      route.stops.includes(from) && route.stops.includes(to)
    );
    setSelectedRoute(matchingRoute || null);
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Bus size={32} />
          <span>BusTracker</span>
        </div>
        <div className="user-section">
          <span className="user-name">Welcome, {user?.name}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="left-panel">
          <SearchBar onSearch={handleSearch} />
          <RouteList routes={busRoutes} onRouteSelect={handleRouteSelect} />
        </div>
        <Map selectedRoute={selectedRoute} />
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    const userData = {
      email: credentials.email,
      name: credentials.email.split('@')[0]
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleSignup = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
    <Routes>
      <Route path="/" element={<WelcomePage onLogin={handleLogin} onSignup={handleSignup} />} />
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
    </Routes>
  </Router>
  );
}

export default App;
