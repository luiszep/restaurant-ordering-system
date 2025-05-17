import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerPaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 text-lg mb-6">
        Thank you! Your payment was received and your order is being prepared.
      </p>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default CustomerPaymentSuccessPage;
