// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '700px',
      margin: 'auto',
      padding: '60px 20px',
      textAlign: 'center',
      border: '2px solid #4b0082',
      borderRadius: '12px',
      marginTop: '80px',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Welcome to the Restaurant Ordering System
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Empower your restaurant with a complete QR-based ordering, kitchen, and billing platform. Streamline operations, enhance service, and modernize your customer experience.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          onClick={() => navigate('/admin/register')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#FFD700',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('/admin/login')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4b0082',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Home;
