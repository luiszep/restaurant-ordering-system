import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Optional: clear customer-related data if needed
    localStorage.removeItem('customerCart');
    localStorage.removeItem('traditionalPaymentConfirmed');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
      <h1 className="text-2xl font-bold text-red-700 mb-4">Session Expired</h1>
      <p className="text-gray-700 mb-6">
        This session is no longer active. If you’re still at the table, please scan the QR code again or ask a staff member for help.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SessionExpiredPage;
