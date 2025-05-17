import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerTraditionalPaymentPage = () => {
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Simulate backend check for payment confirmation
    const interval = setInterval(() => {
      const confirmed = localStorage.getItem('traditionalPaymentConfirmed');
      if (confirmed === 'true') {
        clearInterval(interval);
        setPaymentConfirmed(true);
        setTimeout(() => {
          navigate('/receipt');
        }, 1000); // brief pause before navigating
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-yellow-700">Waiting for Payment Confirmation...</h1>
      <p className="text-gray-700 mb-4">
        Please wait while your server completes the payment. This page will update automatically.
      </p>

      <div className="text-sm text-gray-500">
        You’ll be shown a receipt once payment is marked complete.
      </div>
    </div>
  );
};

export default CustomerTraditionalPaymentPage;
