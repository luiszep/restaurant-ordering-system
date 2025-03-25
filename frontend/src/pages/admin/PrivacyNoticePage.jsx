import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyNoticePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Privacy Notice</h1>
      <p>This is the Privacy Notice page. Here, you can add your platform's privacy policies.</p>
    </div>
  );
};

export default PrivacyNoticePage;
