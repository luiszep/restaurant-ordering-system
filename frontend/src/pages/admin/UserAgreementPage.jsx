// File: src/pages/UserAgreementPage.jsx
// Description: Static page for displaying the platform's user agreement and terms
// This is where legal or service terms would be presented to users during registration or use

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserAgreementPage = () => {
  const navigate = useNavigate(); // React Router hook for future navigation if needed

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>User Agreement</h1>

      <p>
        This is the User Agreement page. Here, you can add the terms and
        conditions of your platform.
      </p>
    </div>
  );
};

export default UserAgreementPage;
