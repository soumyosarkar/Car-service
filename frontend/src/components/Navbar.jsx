import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🚗</span>
            AutoCare Pro
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/services" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/book-appointment" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Book Service
                </Link>
                <Link to="/my-appointments" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  My Appointments
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <div className="navbar-user">
                  <span className="user-name">Hi, {user?.name}</span>
                  <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-secondary btn-sm" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>

          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;