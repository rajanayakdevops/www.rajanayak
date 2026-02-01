import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import './AdminLoginPopup.css';

const AdminLoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login(credentials);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        onLoginSuccess && onLoginSuccess(userData);
      }, 2000);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-popup-overlay" onClick={onClose}>
      <div className="admin-popup" onClick={e => e.stopPropagation()}>
        {showSuccess ? (
          <div className="success-dialog">
            <div className="success-icon">✓</div>
            <h2>Login Successful!</h2>
            <p>Welcome back, Raja Nayak</p>
          </div>
        ) : (
          <>
            <div className="popup-header">
              <h2>Admin Login</h2>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  placeholder="admin@portfolio.com"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Logging in...
                  </>
                ) : (
                  'Login as Admin'
                )}
              </button>
            </form>
            
            <div className="popup-footer">
              <small>Secure admin access for portfolio management</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLoginPopup;