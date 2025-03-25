import React from 'react';

const Topbar = () => {
  return (
    <div style={{
      height: '60px',
      background: '#fff',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px'
    }}>
      <h3>Restaurant Ordering System</h3>
      <p style={{ fontSize: '14px' }}>Welcome, Admin</p>
    </div>
  );
};

export default Topbar;
