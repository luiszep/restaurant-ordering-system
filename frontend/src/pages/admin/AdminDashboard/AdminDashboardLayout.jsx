// --- React + Routing Imports ---
import React from 'react';
import { Outlet } from 'react-router-dom';

// --- Layout Components ---
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// --- AdminDashboardLayout Component ---
// This layout wraps the admin dashboard pages with a sidebar, topbar, and main content area.
const AdminDashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar stays on the left */}
      <Sidebar />

      {/* Main panel (right side) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Topbar sits above the main content */}
        <Topbar />

        {/* Main content rendered by nested routes (via <Outlet />) */}
        <main style={{
          padding: '30px 40px',            // Top/bottom: 30px, Left/right: 40px
          background: '#f4f4f4',            // Light gray background
          flex: 1,                          // Take up remaining vertical space
          maxWidth: '100%',                // Ensure content doesn’t overflow
          boxSizing: 'border-box'          // Include padding in width calculations
        }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

// --- Export Component ---
export default AdminDashboardLayout;
