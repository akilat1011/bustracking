import { useState } from 'react';
import AuthModal from '../components/AuthModal';

const WelcomePage = ({ onLogin, onSignup }) => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleOpenModal = (mode) => {
    setAuthMode(mode);
    setShowModal(true);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to BusTracker</h1>
        <p className="welcome-subtitle">
          Real-time bus tracking and route planning across Tamil Nadu
        </p>
        <div className="welcome-buttons">
          <button 
            className="welcome-button primary"
            onClick={() => handleOpenModal('login')}
          >
            Login
          </button>
          <button 
            className="welcome-button secondary"
            onClick={() => handleOpenModal('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showModal}
        mode={authMode}
        onClose={() => setShowModal(false)}
        onLogin={onLogin}
        onSignup={onSignup}
      />
    </div>
  );
};

export default WelcomePage;