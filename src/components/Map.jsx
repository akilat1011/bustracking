import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { Navigation, Volume2, Bus as BusIcon, Mic, VolumeX } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Custom control component for the map
function MapControls({ onNavigate, onToggleAudio }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const map = useMap();

  const handleAudioToggle = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio?.(!isAudioEnabled);
  };

  const handleNavigate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
        onNavigate?.([latitude, longitude]);
      });
    }
  };

  return (
    <div className="map-controls">
      <button className="control-button" onClick={handleNavigate} title="Navigate to current location">
        <Navigation size={24} />
      </button>
      <button className="control-button" onClick={handleAudioToggle} title="Toggle voice navigation">
        {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
}

const Map = ({ selectedRoute }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // Major cities in Tamil Nadu with their coordinates
  const majorCities = [
    { name: 'Chennai', position: [13.0827, 80.2707], type: 'major' },
    { name: 'Coimbatore', position: [11.0168, 76.9558], type: 'major' },
    { name: 'Madurai', position: [9.9252, 78.1198], type: 'major' },
    { name: 'Salem', position: [11.6643, 78.1460], type: 'major' },
    { name: 'Tiruchirappalli', position: [10.7905, 78.7047], type: 'major' },
    { name: 'Vellore', position: [12.9165, 79.1325], type: 'major' },
    { name: 'Tirunelveli', position: [8.7139, 77.7567], type: 'major' },
    { name: 'Thoothukudi', position: [8.7642, 78.1348], type: 'major' },
    { name: 'Thanjavur', position: [10.7870, 79.1378], type: 'major' },
    { name: 'Ooty', position: [11.4126, 76.7337], type: 'tourist' },
    { name: 'Kanyakumari', position: [8.0883, 77.5385], type: 'tourist' },
    { name: 'Rameswaram', position: [9.2876, 79.3129], type: 'tourist' },
    { name: 'Velankanni', position: [10.6797, 79.8415], type: 'tourist' },
    { name: 'Hosur', position: [12.7409, 77.8253], type: 'major' },
    { name: 'Erode', position: [11.3410, 77.7172], type: 'major' },
    { name: 'Dindigul', position: [10.3624, 77.9695], type: 'transit' },
    { name: 'Mettupalayam', position: [11.2990, 76.9410], type: 'transit' },
    { name: 'Pudukottai', position: [10.3833, 78.8001], type: 'transit' },
    { name: 'Nagapattinam', position: [10.7672, 79.8449], type: 'transit' },
    { name: 'Dharmapuri', position: [12.1289, 78.1578], type: 'transit' },
    { name: 'Villupuram', position: [11.9401, 79.4861], type: 'transit' }
  ];

  // Custom icons for different types of cities
  const icons = {
    major: L.divIcon({
      className: 'custom-marker major-city',
      html: '<div class="marker-dot major"></div><div class="marker-pulse"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    }),
    tourist: L.divIcon({
      className: 'custom-marker tourist-spot',
      html: '<div class="marker-dot tourist"></div><div class="marker-pulse"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    }),
    transit: L.divIcon({
      className: 'custom-marker transit-point',
      html: '<div class="marker-dot transit"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    }),
    bus: L.divIcon({
      className: 'custom-bus-icon',
      html: '<div class="bus-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4a2 2 0 0 0-2 2v10h2m10 0h-4"></path><circle cx="6.5" cy="17.5" r="2.5"></circle><circle cx="16.5" cy="17.5" r="2.5"></circle></svg></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  };

  useEffect(() => {
    if (!map) return;

    if (selectedRoute) {
      // Remove existing routing control
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }

      // Create waypoints from the route coordinates
      const waypoints = selectedRoute.coordinates.map(coord => L.latLng(coord[0], coord[1]));

      // Add new routing control
      routingControlRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: '#3b82f6', weight: 4 }]
        },
        createMarker: function(i, waypoint, n) {
          const marker = L.marker(waypoint.latLng, { icon: icons.bus });
          marker.bindPopup(`<b>${selectedRoute.stops[i]}</b><br>Stop ${i + 1} of ${n}`);
          return marker;
        },
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
      }).addTo(map);

      // Listen for route calculation results
      routingControlRef.current.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        setDistance((summary.totalDistance / 1000).toFixed(1)); // Convert to km
        setDuration(Math.round(summary.totalTime / 60)); // Convert to minutes
      });

      // Fit bounds to show the entire route
      const bounds = L.latLngBounds(waypoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [selectedRoute, map]);

  const handleNavigate = (coords) => {
    console.log('Navigating to:', coords);
  };

  const handleToggleAudio = (enabled) => {
    console.log('Audio enabled:', enabled);
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[11.1271, 78.6569]} // Tamil Nadu center
        zoom={7}
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {majorCities.map((city, index) => (
          <Marker 
            key={index} 
            position={city.position}
            icon={icons[city.type]}
          >
            <Popup>
              <div className="city-popup">
                <h3>{city.name}</h3>
                <p>{city.type === 'major' ? 'Major City' : 
                    city.type === 'tourist' ? 'Tourist Destination' : 
                    'Transit Point'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapControls onNavigate={handleNavigate} onToggleAudio={handleToggleAudio} />
      </MapContainer>
      
      {selectedRoute && distance && duration && (
        <div className="route-info">
          <div className="info-item">
            <BusIcon size={20} />
            <span>{selectedRoute.name}</span>
          </div>
          <div className="info-item">
            <span>Distance: {distance} km</span>
          </div>
          <div className="info-item">
            <span>Duration: {duration} mins</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;