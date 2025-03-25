import React from 'react';

const VerifyPhonePage = () => {
  const phone = localStorage.getItem("userPhone");

  return (
    <div style={{
      textAlign: 'center', padding: '50px', maxWidth: '400px',
      margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
    }}>
      <h2>Verify your phone number</h2>
      <p>We sent a verification code to <b>{phone}</b>.</p>
      <p>(This is just a placeholder page for now.)</p>
    </div>
  );
};

export default VerifyPhonePage;
