// File: src/pages/PrivacyNoticePage.jsx
// Description: Static page for displaying the platform’s privacy policies.
// This component can be linked from signup/login flows or the footer.

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyNoticePage = () => {
  const navigate = useNavigate(); // Hook to allow navigation, not currently used but ready if needed

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Privacy Notice</h1>
      <p>
        This is the Privacy Notice page. Here, you can add your platform's privacy policies.
      </p>
    </div>
  );
};

export default PrivacyNoticePage;
