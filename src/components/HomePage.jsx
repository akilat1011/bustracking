import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './HomePage.css';

const HomePage = () => {
  // Predefined routes with details
  const predefinedRoutes = [
    {
      id: 1,
      name: 'Route 1: Chennai to Madurai',
      time: '10 min',
      stops: ['Chennai', 'Trichy', 'Madurai'],
    },
    {
      id: 2,
      name: 'Route 2: Coimbatore to Ooty',
      time: '15 min',
      stops: ['Coimbatore', 'Mettupalayam', 'Ooty'],
    },
    {
      id: 3,
      name: 'Route 3: Trichy to Kanyakumari',
      time: '20 min',
      stops: ['Trichy', 'Madurai', 'Kanyakumari'],
    },
  ];

  const [selectedRoute, setSelectedRoute] = useState(null);

  // Handle route selection
  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <div className="left-sidebar">
          <h2>Plan Your Journey</h2>
          <div className="search-section">
            <input type="text" placeholder="Current Location" />
            <input type="text" placeholder="Where to?" />
          </div>

          <div className="available-routes">
            <h2>Available Routes</h2>
            {predefinedRoutes.map((route) => (
              <button
                key={route.id}
                className={`route-button ${selectedRoute?.id === route.id ? 'selected' : ''}`}
                onClick={() => handleRouteClick(route)}
              >
                {route.name}
              </button>
            ))}
          </div>

          {/* Display selected route details */}
          {selectedRoute && (
            <div className="route-details">
              <h3>{selectedRoute.name}</h3>
              <p><strong>Time:</strong> {selectedRoute.time}</p>
              <p><strong>Stops:</strong> {selectedRoute.stops.join(' → ')}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;