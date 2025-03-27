import { Clock, Bus, MapPin } from 'lucide-react';

const RouteList = ({ routes, onRouteSelect }) => {
  return (
    <div className="route-list">
      <h2 className="search-title">Available Routes</h2>
      {routes.map((route) => (
        <div 
          key={route.id} 
          className="route-item"
          onClick={() => onRouteSelect(route)}
        >
          <div className="route-name">
            <Bus size={20} style={{ marginRight: '8px', display: 'inline' }} />
            {route.name}
          </div>
          <div className="route-details">
            <p>
              <Clock size={16} style={{ marginRight: '4px', display: 'inline' }} />
              Duration: {route.duration}
            </p>
            <p>Price: {route.price}</p>
            <p>
              <MapPin size={16} style={{ marginRight: '4px', display: 'inline' }} />
              Via: {route.stops.join(' → ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteList;