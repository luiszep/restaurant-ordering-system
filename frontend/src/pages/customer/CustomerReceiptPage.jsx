import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerReceiptPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('customerCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Thank You!</h1>
        <p className="text-center text-gray-600 mb-6">Your order has been paid and received.</p>

        <div className="border-t border-b py-4 mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-800 mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
          <span>Total Paid:</span>
          <span>${calculateTotal()}</span>
        </div>

        <p className="text-sm text-center text-gray-500 mb-6">This receipt confirms your payment. Have a great meal!</p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CustomerReceiptPage;
