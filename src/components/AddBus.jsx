import React, { useState } from "react";

const AddBus = () => {
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");
  const [timings, setTimings] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const busData = {
      name,
      route: route.split(",").map((stop) => stop.trim()), // Convert string to array
      timings: timings.split(",").map((time) => time.trim()), // Convert string to array
    };

    try {
      const response = await fetch("http://localhost:5000/api/buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(busData),
      });

      const data = await response.json();
      alert(data.message); // ✅ Show success message
      setName("");
      setRoute("");
      setTimings("");
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", maxWidth: "400px", margin: "20px auto" }}>
      <h2>Add a New Bus</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bus Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Route (e.g., Chennai, Salem, Coimbatore)"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Timings (e.g., 6:00 AM, 10:00 AM)"
          value={timings}
          onChange={(e) => setTimings(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
