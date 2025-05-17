import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerOnlinePaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Online Payment</h1>
      <p className="text-gray-600 mb-8">
        Online payment will be handled securely through Stripe during the final stage of development.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
        onClick={() => navigate('/cart')}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default CustomerOnlinePaymentPage;
