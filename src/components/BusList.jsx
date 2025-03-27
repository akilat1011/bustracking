import React from 'react';
import './BusList.css';

const BusList = ({ buses, onRouteSelect, selectedRoute }) => {
  return (
    <div className="bus-list">
      <h2>Available Routes</h2>
      <div className="bus-container">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className={`bus-item ${selectedRoute === bus.id ? 'selected' : ''}`}
            onClick={() => onRouteSelect(bus.id)}
          >
            <span className="bus-id">🚌 {bus.route}</span>
            <span className="bus-time">{bus.time}</span>
            <span className="bus-stops">Via: {bus.stops.join(' → ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;