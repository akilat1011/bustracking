import React from "react";
import { Navigation, Bus, Volume2 } from "lucide-react";

const IconTest = () => {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <Navigation size={40} color="blue" />
      <Bus size={40} color="green" />
      <Volume2 size={40} color="red" />
    </div>
  );
};

export default IconTest;
