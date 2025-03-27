import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bus, Navigation, Volume2, Languages } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const Map = () => {

  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [buses, setBuses] = useState<{ id: number; position: [number, number]; route: string }[]>([]);


  useEffect(() => {
    // Simulated bus data
    const mockBuses: { id: number; position: [number, number]; route: string }[] = [
      { id: 1, position: [51.505, -0.09], route: "Route 1" },
      { id: 2, position: [51.51, -0.1], route: "Route 2" },
      { id: 3, position: [51.49, -0.08], route: "Route 3" }
    ];
    
    setBuses(mockBuses);
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buses.map((bus) => (
          <Marker key={bus.id} position={bus.position}>
            <Popup>
              <div className="bus-info">
                <h3>{bus.route}</h3>
                <p>Next Stop: Central Station</p>
                <p>Arriving in: 5 mins</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="controls">
        <button className="control-button">
          <Navigation size={24} />
        </button>
        <button className="control-button">
          <Volume2 size={24} />
        </button>
        <button className="control-button">
          <Bus size={24} />
        </button>
      </div>

      <div className="language-selector">
        <Languages size={20} />
        <select>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>
  );
};

export default Map;