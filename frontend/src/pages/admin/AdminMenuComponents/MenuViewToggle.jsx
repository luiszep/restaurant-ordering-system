// File: MenuViewToggle.jsx
import React from 'react';

const MenuViewToggle = ({ viewMode, setViewMode }) => {
  return (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
  <div style={{
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '999px',
    overflow: 'hidden'
  }}>
    <button
      onClick={() => setViewMode('detailed')}
      style={{
        padding: '10px 20px',
        backgroundColor: viewMode === 'detailed' ? '#111' : '#fff',
        color: viewMode === 'detailed' ? '#fff' : '#000',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '999px 0 0 999px',
        cursor: 'pointer'
      }}
    >
      Detailed View
    </button>
    <button
      onClick={() => setViewMode('summarized')}
      style={{
        padding: '10px 20px',
        backgroundColor: viewMode === 'summarized' ? '#111' : '#fff',
        color: viewMode === 'summarized' ? '#fff' : '#000',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '0 999px 999px 0',
        cursor: 'pointer'
      }}
    >
      Summarized View
    </button>
  </div>
</div>
);
};

export default MenuViewToggle;