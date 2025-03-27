import { Clock, Bus } from 'lucide-react';

interface Route {
  id: number;
  name: string;
  time: string;
  stops: string[];
}

const RouteList = () => {
  const routes: Route[] = [
    { id: 1, name: 'Route 1', time: '10 min', stops: ['Stop A', 'Stop B', 'Stop C'] },
    { id: 2, name: 'Route 2', time: '15 min', stops: ['Stop D', 'Stop E', 'Stop F'] },
    { id: 3, name: 'Route 3', time: '20 min', stops: ['Stop G', 'Stop H', 'Stop I'] },
  ];

  return (
    <div className="route-list">
      {routes.map((route) => (
        <div key={route.id} className="route-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bus size={24} />
            <div>
              <h3>{route.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} />
                <span>{route.time}</span>
              </div>
              <p>Via: {route.stops.join(' → ')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteList;