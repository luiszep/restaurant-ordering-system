import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      maxWidth: '400px',
      margin: 'auto',
      border: '2px solid #4b0082',
      borderRadius: '10px'
    }}>
      <h2>🎉 Congratulations!</h2>
      <p>Your account has been successfully created.</p>
      <p>You can now log in and access your admin dashboard.</p>

      <button
        onClick={() => navigate('/admin/login')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#FFD700',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default SuccessPage;
