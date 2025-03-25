import React, { useState, useEffect } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [canRequest, setCanRequest] = useState(true);
  const [clicking, setClicking] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('resetLimits')) || {};
    const record = data[email];

    if (record) {
      const now = Date.now();
      setAttemptNumber(record.count);
      if (record.count >= 3 && now - record.timestamp < 2 * 60 * 60 * 1000) {
        setCanRequest(false);
        setMessage('You’ve reached the maximum reset attempts. Please try again in 2 hours.');
      }
    } else {
      setAttemptNumber(0);
    }
  }, [email]);

  const handleResetRequest = (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem('resetLimits')) || {};
    const now = Date.now();
    const record = data[email];

    if (record && record.count >= 3 && now - record.timestamp < 2 * 60 * 60 * 1000) {
      setCanRequest(false);
      setMessage('You’ve reached the maximum reset attempts. Please try again in 2 hours.');
      return;
    }

    let count;
    if (!record || now - record.timestamp >= 2 * 60 * 60 * 1000) {
      count = 1;
      data[email] = { count, timestamp: now };
    } else {
      count = record.count + 1;
      data[email].count = count;
    }

    localStorage.setItem('resetLimits', JSON.stringify(data));
    setAttemptNumber(count);

    // Set feedback message based on attempt number
    if (count === 1) {
      setMessage('If this email is registered, a reset link will be sent.');
    } else if (count === 2) {
      setMessage('A second reset link will be sent if this email is registered.');
    } else if (count === 3) {
      setMessage('Final reset link sent. Please check your inbox carefully.');
    }

    // Visual click feedback
    setClicking(true);
    setTimeout(() => setClicking(false), 150);
  };

  return (
    <div style={{
      textAlign: 'center', padding: '50px', maxWidth: '400px',
      margin: 'auto', border: '2px solid #4b0082', borderRadius: '10px'
    }}>
      <h2>Forgot Password?</h2>
      <p>Enter your email to receive a reset link.</p>
      <form onSubmit={handleResetRequest}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage('');
            setCanRequest(true);
            setAttemptNumber(0);
          }}
          required
          style={{ width: '94%', padding: '10px', margin: '10px 0' }}
        />
        <button
          type="submit"
          disabled={!canRequest}
          style={{
            width: '100%',
            padding: '10px',
            background: canRequest ? (clicking ? '#e6c200' : '#FFD700') : 'gray',
            fontWeight: 'bold',
            cursor: canRequest ? 'pointer' : 'not-allowed',
            opacity: clicking ? 0.9 : 1,
            transition: 'background 0.2s, opacity 0.2s',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Send Reset Link
        </button>
      </form>
      {message && <p style={{ color: canRequest ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
