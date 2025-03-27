import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";

// 🔹 List of Tamil Nadu Locations (Predefined)
const locations = {
  "Chennai": [13.0827, 80.2707],
  "Coimbatore": [11.0168, 76.9558],
  "Madurai": [9.9252, 78.1198],
  "Salem": [11.6643, 78.1460],
  "Tiruchirappalli": [10.7905, 78.7047],
  "Erode": [11.3410, 77.7172],
  "Vellore": [12.9165, 79.1325],
};

// 🔹 Function to Auto-Zoom Map to the Route
const UpdateMapView = ({ routeCoords }) => {
  const map = useMap();
  if (routeCoords.length > 0) {
    map.fitBounds(routeCoords);
  }
  return null;
};

const RouteFinder = () => {
  const [from, setFrom] = useState("Chennai");
  const [to, setTo] = useState("Coimbatore");
  const [route, setRoute] = useState(null);

  const getRoute = async () => {
    if (!from || !to || from === to) {
      alert("Please select different locations!");
      return;
    }

    const apiKey = process.env.REACT_APP_ORS_API_KEY;
    const start = locations[from].reverse().join(","); // Convert to "lng,lat"
    const end = locations[to].reverse().join(",");

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes) {
        const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute({
          path: coordinates,
          distance: (data.routes[0].summary.distance / 1000).toFixed(2), // Convert meters to km
          duration: (data.routes[0].summary.duration / 60).toFixed(2), // Convert seconds to minutes
        });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Failed to fetch route. Check API key and network.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h2>Plan Your Journey</h2>
      <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: "10px", marginBottom: "10px" }}>
        {Object.keys(locations).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <select value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: "10px", marginBottom: "10px" }}>
        {Object.keys(locations).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <button onClick={getRoute} style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
        Find Route
      </button>

      <MapContainer center={[11.1271, 78.6569]} zoom={7} style={{ height: "500px", width: "80%", marginTop: "20px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {route && (
          <>
            <Polyline positions={route.path} color="blue" />
            <UpdateMapView routeCoords={route.path} />
          </>
        )}
      </MapContainer>

      {route && (
        <p>
          🚗 Distance: {route.distance} km | ⏳ Duration: {route.duration} mins
        </p>
      )}
    </div>
  );
};

export default RouteFinder;
