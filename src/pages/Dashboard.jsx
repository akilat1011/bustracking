import { useState } from "react";
import { Bus, LogOut } from "lucide-react";
import Map from "../components/Map";
import SearchBar from "../components/SearchBar";
import RouteList from "../components/RouteList";
import BusTracker from "../components/BusTracker";
import AddBus from "../components/AddBus"; // ✅ Import AddBus Component

const Dashboard = ({ user, onLogout }) => {
  const [route, setRoute] = useState(null);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Bus size={32} />
          <span>BusTracker</span>
        </div>
        <div className="user-section">
          <span className="user-name">Welcome, {user?.name}</span>
          <button className="logout-button" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <SearchBar onSearch={setRoute} />
          <RouteList />
          <BusTracker />
          <AddBus /> {/* ✅ Add Bus Form */}
        </div>
        <Map route={route} />
      </div>
    </div>
  );
};

export default Dashboard;
