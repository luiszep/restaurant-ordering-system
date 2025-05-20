import React, { useState, useEffect } from 'react';
import MobileBlockMessage from "../../../components/MobileBlockMessage";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [canRequest, setCanRequest] = useState(true);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('resetLimits')) || {};
    const record = data[email];

    if (record) {
      const now = Date.now();
      if (record.count >= 3 && now - record.timestamp < 2 * 60 * 60 * 1000) {
        setCanRequest(false);
        setMessage('You’ve reached the maximum reset attempts. Please try again in 2 hours.');
      }
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

    if (count === 1) {
      setMessage('If this email is registered, a reset link will be sent.');
    } else if (count === 2) {
      setMessage('A second reset link will be sent if this email is registered.');
    } else if (count === 3) {
      setMessage('Final reset link sent. Please check your inbox carefully.');
    }

    setClicking(true);
    setTimeout(() => setClicking(false), 150);
  };

  return (
    <>
    <MobileBlockMessage />
    <div className="hidden md:block">
    <div className="min-h-screen bg-[url('/images/modern-pattern-bg.png')] bg-repeat bg-center bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-green-500 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Forgot Password?</h2>
        <p className="text-center text-gray-300">Enter your email to receive a reset link.</p>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
              setCanRequest(true);
            }}
            required
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={!canRequest}
            className={`w-full font-bold py-3 rounded-md transition duration-300 ${
              canRequest
                ? `bg-green-500 hover:bg-green-600 text-white ${clicking ? 'opacity-90' : ''}`
                : 'bg-gray-600 text-white cursor-not-allowed'
            }`}
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className={`text-center text-sm ${canRequest ? 'text-green-400' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default ForgotPasswordPage;
