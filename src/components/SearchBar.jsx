import { useState } from 'react';
import { Search, MapPin, X, Clock, Bus, IndianRupee, Calendar } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  const routes = [
    {
      id: '67e43f0e405f309554b36984',
      name: 'Ooty Hill Bus',
      route: ['Coimbatore', 'Mettupalayam', 'Ooty'],
      timings: ['7:00 AM', '11:00 AM', '4:30 PM'],
      distance: '90 km',
      time: '3 hours'
    },
    {
      id: '67e43f0e405f309554b36985',
      name: 'Trichy - Rameswaram Special',
      route: ['Trichy', 'Pudukottai', 'Rameswaram'],
      timings: ['5:45 AM', '11:00 AM', '6:30 PM'],
      distance: '300 km',
      time: '6 hours'
    },
    {
      id: '67e43f0e405f309554b36982',
      name: 'Chennai Express',
      route: ['Chennai', 'Vellore', 'Bangalore'],
      timings: ['5:00 AM', '9:00 AM', '2:00 PM'],
      distance: '350 km',
      time: '6 hours'
    },
    {
      id: '67e43f0e405f309554b36983',
      name: 'Madurai Deluxe',
      route: ['Madurai', 'Dindigul', 'Trichy', 'Chennai'],
      timings: ['6:15 AM', '12:30 PM', '8:45 PM'],
      distance: '450 km',
      time: '7 hours'
    },
    {
      id: '67e43f0e405f309554b36986',
      name: 'Kanyakumari Express',
      route: ['Chennai', 'Tirunelveli', 'Kanyakumari'],
      timings: ['4:30 AM', '9:00 AM', '10:00 PM'],
      distance: '700 km',
      time: '12 hours'
    },
    {
      id: '67e43f0e405f309554b36987',
      name: 'Velankanni Pilgrim Bus',
      route: ['Chennai', 'Nagapattinam', 'Velankanni'],
      timings: ['6:00 AM', '2:00 PM', '10:00 PM'],
      distance: '330 km',
      time: '7 hours'
    },
    {
      id: '67e43f0e405f309554b36988',
      name: 'Erode - Bengaluru Express',
      route: ['Erode', 'Dharmapuri', 'Bangalore'],
      timings: ['6:30 AM', '2:30 PM', '10:30 PM'],
      distance: '290 km',
      time: '5 hours'
    },
    {
      id: '67e43f0e405f309554b36980',
      name: 'Coimbatore Express',
      route: ['Coimbatore', 'Salem', 'Chennai'],
      timings: ['6:00 AM', '10:00 AM', '3:00 PM'],
      distance: '500 km',
      time: '8 hours'
    },
    {
      id: '67e43f0e405f309554b36981',
      name: 'Salem Superfast',
      route: ['Salem', 'Erode', 'Madurai'],
      timings: ['7:30 AM', '1:00 PM', '5:30 PM'],
      distance: '250 km',
      time: '5 hours'
    },
    {
      id: '67e43f0e405f309554b36989',
      name: 'Salem - Pondicherry Deluxe',
      route: ['Salem', 'Villupuram', 'Pondicherry'],
      timings: ['7:00 AM', '1:00 PM', '7:00 PM'],
      distance: '220 km',
      time: '4 hours'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromLocation && toLocation) {
      // Find routes that match the search criteria
      const matchingRoutes = routes.filter(route => {
        const fromIndex = route.route.findIndex(stop => 
          stop.toLowerCase().includes(fromLocation.toLowerCase())
        );
        const toIndex = route.route.findIndex(stop => 
          stop.toLowerCase().includes(toLocation.toLowerCase())
        );
        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
      });
      
      if (matchingRoutes.length > 0) {
        setCurrentRoute(matchingRoutes[0]);
        setShowResults(true);
        onSearch({ from: fromLocation, to: toLocation });
      }
    }
  };

  const handleExit = () => {
    setShowResults(false);
    setCurrentRoute(null);
    setFromLocation('');
    setToLocation('');
  };

  return (
    <div className="search-section">
      {showResults && currentRoute && (
        <div className="search-results">
          <div className="results-header">
            <h3>Route Details</h3>
            <button className="exit-button" onClick={handleExit}>
              <X size={20} />
            </button>
          </div>
          <div className="route-details-popup">
            <div className="route-detail-item">
              <Bus size={20} />
              <span>{currentRoute.name}</span>
            </div>
            <div className="route-detail-item">
              <Clock size={20} />
              <span>Duration: {currentRoute.time}</span>
            </div>
            <div className="route-detail-item">
              <MapPin size={20} />
              <span>Distance: {currentRoute.distance}</span>
            </div>
            <div className="route-detail-item">
              <Calendar size={20} />
              <span>Timings: {currentRoute.timings.join(' | ')}</span>
            </div>
            <div className="route-detail-item route-stops">
              <MapPin size={20} />
              <span>Via: {currentRoute.route.join(' → ')}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="search-container">
        <h2 className="search-title">Plan Your Journey</h2>
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <MapPin className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="From (e.g., Chennai, Madurai)"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              required
            />
          </div>
          <div className="search-box">
            <MapPin className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="To (e.g., Bangalore, Pondicherry)"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="search-button">
            Find Routes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;