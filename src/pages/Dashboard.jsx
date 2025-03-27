import { useState } from "react";
import { Bus, LogOut } from "lucide-react";
import Map from "../components/Map";
import SearchBar from "../components/SearchBar";
import RouteList from "../components/RouteList";
import BusTracker from "../components/BusTracker";
import AddBus from "../components/AddBus"; 

const Dashboard = ({ user, onLogout }) => {
  const [route, setRoute] = useState(null);

  const handleLogoutClick = () => {
    console.log("Logout button clicked");
    onLogout();
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Bus size={32} />
          <span>BusTracker</span>
        </div>
        <div className="user-section">
          <span className="user-name">Welcome, {user?.name}</span>
          <button className="logout-button" onClick={handleLogoutClick}>
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
          <AddBus />
        </div>
        <Map route={route} />
      </div>
    </div>
  );
};

export default Dashboard;
