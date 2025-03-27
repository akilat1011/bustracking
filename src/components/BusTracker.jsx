import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BusTracker = () => {
  const [route, setRoute] = useState(null);

  const predefinedRoutes = {
    "Chennai-Salem": {
      path: [
        [13.0827, 80.2707], // Chennai
        [11.6643, 78.1460], // Salem
      ],
      distance: "345 km",
      time: "5 hours",
    },
  };

  const findRoutes = () => {
    setRoute(predefinedRoutes["Chennai-Salem"]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel */}
      <div style={{ width: "30%", padding: "20px", background: "#f9f9f9" }}>
        <h2>Plan Your Journey</h2>
        <input type="text" value="Chennai" readOnly style={{ display: "block", marginBottom: "10px", padding: "10px" }} />
        <input type="text" value="Salem" readOnly style={{ display: "block", marginBottom: "10px", padding: "10px" }} />
        <button onClick={findRoutes} style={{ padding: "10px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Find Routes
        </button>

        {route && (
          <div style={{ marginTop: "20px", padding: "10px", background: "#fff", borderRadius: "5px" }}>
            <h3>Route Details</h3>
            <p>Distance: {route.distance}</p>
            <p>Estimated Time: {route.time}</p>
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer center={[12.5, 79]} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {route && (
            <>
              <Polyline positions={route.path} color="blue" />
              {route.path.map((pos, index) => (
                <Marker key={index} position={pos}>
                  <Popup>{index === 0 ? "Chennai" : "Salem"}</Popup>
                </Marker>
              ))}
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default BusTracker;
