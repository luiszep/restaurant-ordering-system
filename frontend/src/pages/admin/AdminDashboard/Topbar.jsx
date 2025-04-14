// --- Imports ---
import React from 'react';

// --- Topbar Component ---
// Displays the top navigation bar inside the admin dashboard layout
const Topbar = () => {
  return (
    <div style={{
      height: '60px',                   // Fixed height for the top bar
      background: '#fff',               // White background
      borderBottom: '1px solid #ccc',   // Subtle bottom border
      display: 'flex',                  // Horizontal layout
      alignItems: 'center',             // Vertically center content
      justifyContent: 'space-between',  // Space between title and greeting
      padding: '0 20px'                 // Horizontal padding
    }}>
      
      {/* System Title */}
      <h3>Restaurant Ordering System</h3>

      {/* Admin Greeting */}
      <p style={{ fontSize: '14px' }}>Welcome, Admin</p>
    </div>
  );
};

// --- Export Component ---
export default Topbar;
