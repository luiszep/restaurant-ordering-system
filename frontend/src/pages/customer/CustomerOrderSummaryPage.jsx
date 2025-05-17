import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerOrderSummaryPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('customerCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleTraditionalPayment = () => {
    navigate('/pay-traditional');
  };
  
  const handleOnlinePayment = () => {
    navigate('/pay-online');
  };  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Summary</h1>

      {/* Total Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center mb-8">
        <p className="text-lg">Order Total:</p>
        <p className="text-3xl font-bold mt-2">${calculateTotal()}</p>
      </div>

      {/* Payment Options */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleTraditionalPayment}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-lg"
        >
          Pay Traditionally
        </button>

        <button
          onClick={handleOnlinePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg"
        >
          Pay Online
        </button>
      </div>
    </div>
  );
};

export default CustomerOrderSummaryPage;
