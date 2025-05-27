// src/components/Header.jsx
import React from 'react';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={styles.header}>
      <h2>Resume Builder</h2>
      <div>
        <span style={styles.username}>👤 {user.name}</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logout: {
    marginLeft: '10px',
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  username: {
    marginRight: '10px',
  }
};

export default Header;
