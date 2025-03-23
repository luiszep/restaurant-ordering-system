import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyNoticePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Privacy Notice</h1>
      <p>This is the Privacy Notice page. Here, you can add your platform's privacy policies.</p>
      <button onClick={() => navigate('/admin/register')}>
        Return to Previous Page
      </button>
    </div>
  );
};

export default PrivacyNoticePage;
