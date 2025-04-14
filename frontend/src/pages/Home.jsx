// File: src/pages/Home.jsx
// Description: Landing page for the Restaurant Ordering System
// Displays a simple welcome interface with navigation buttons for Admin sign-up and login

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Hook from React Router to navigate between routes

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: 'auto',
        padding: '60px 20px',
        textAlign: 'center',
        border: '2px solid #4b0082',
        borderRadius: '12px',
        marginTop: '80px',
      }}
    >
      {/* Page Title */}
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Welcome to the Restaurant Ordering System
      </h1>

      {/* Description Text */}
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Empower your restaurant with a complete QR-based ordering, kitchen, and billing platform.
        Streamline operations, enhance service, and modernize your customer experience.
      </p>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {/* Sign Up Button */}
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

        {/* Log In Button */}
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
