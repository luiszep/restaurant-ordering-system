import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserAgreementPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>User Agreement</h1>
      <p>This is the User Agreement page. Here, you can add the terms and conditions of your platform.</p>
      <button onClick={() => navigate('/admin/register')}>
        Return to Previous Page
      </button>
    </div>
  );
};

export default UserAgreementPage;