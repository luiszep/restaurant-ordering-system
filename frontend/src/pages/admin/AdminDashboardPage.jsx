import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '50px',
      maxWidth: '800px',
      margin: 'auto',
      textAlign: 'center',
      border: '2px solid #4b0082',
      borderRadius: '10px',
    }}>
      <h1>👑 Admin Dashboard</h1>
      <p>Welcome, admin! Choose a section:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <button onClick={() => navigate('/admin/menu')} style={buttonStyle}>📋 Manage Menus</button>
        <button onClick={() => navigate('/admin/tables')} style={buttonStyle}>🪑 Configure Table Layout</button>
        <button onClick={() => navigate('/admin/payments')} style={buttonStyle}>💳 Payment Settings</button>
        <button onClick={() => navigate('/admin/orders')} style={buttonStyle}>📦 View Orders</button>
        <button onClick={() => navigate('/admin/staff')} style={buttonStyle}>👥 Manage Staff</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#FFD700',
  border: '2px solid #4b0082',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#000',
};

export default AdminDashboardPage;
