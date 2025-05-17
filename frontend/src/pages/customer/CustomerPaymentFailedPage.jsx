import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerPaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-gray-700 text-lg mb-6">
        Sorry, your payment could not be processed. You can try again or choose another payment method.
      </p>

      <div className="flex flex-col space-y-3 w-full max-w-xs">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          onClick={() => navigate('/order-summary')}
        >
          Try Again
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg text-lg"
          onClick={() => navigate('/cart')}
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomerPaymentFailedPage;
