import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleLoginSuccess = (userData) => {
    // Context will handle the state update
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = (email) => {
    return 'RN'; // Raja Nayak initials
  };

  const getUserName = () => {
    return 'Raja Nayak';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">Raja Nayak</Link>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={isActive('/projects') ? 'active' : ''}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/explore" 
              className={isActive('/explore') ? 'active' : ''}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
          <li>
            {user ? (
              <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="user-avatar">
                  {getUserInitials(user.email)}
                </div>
                <div className="user-info">
                  <p className="user-name">{getUserName()}</p>
                  <p className="user-role">{user.role}</p>
                </div>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item">Dashboard</button>
                    <button className="dropdown-item">Settings</button>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => onLoginClick(handleLoginSuccess)} className="admin-login-btn">
                Admin
              </button>
            )}
          </li>
        </ul>
        
        <div 
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;