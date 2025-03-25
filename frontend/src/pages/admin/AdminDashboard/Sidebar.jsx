import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{
      width: '220px',
      background: '#4b0082',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h2 style={{ marginBottom: '30px' }}>Admin</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/admin/dashboard" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/admin/menu" style={{ color: 'white' }}>Menu</Link>
        <Link to="/admin/tables" style={{ color: 'white' }}>Tables</Link>
        <Link to="/admin/orders" style={{ color: 'white' }}>Orders</Link>
        <Link to="/admin/payments" style={{ color: 'white' }}>Payments</Link>
        <Link to="/admin/staff" style={{ color: 'white' }}>Staff</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
