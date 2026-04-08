import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Securely store token
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminName', data.name);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid Credentials');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="al-header">
          <div className="al-logo">✈️ F2S</div>
          <h2>Admin Portal</h2>
          <p>Restricted Access Only</p>
        </div>

        {errorMsg && <div className="al-error">{errorMsg}</div>}

        <form onSubmit={handleLogin} className="al-form">
          <div className="al-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="al-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
