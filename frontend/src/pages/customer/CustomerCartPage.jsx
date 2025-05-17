import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerCartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const savedCart = localStorage.getItem('customerCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) return removeItem(index);
  
    const updated = [...cart];
    updated[index].quantity = newQty;
    setCart(updated);
    localStorage.setItem('customerCart', JSON.stringify(updated));
  };
  
  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('customerCart', JSON.stringify(updated));
  };  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0"
            >
              {/* Item Details */}
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{item.name}</span>
                <span className="text-sm text-gray-600">${parseFloat(item.price).toFixed(2)}</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 text-sm hover:underline self-end sm:self-auto"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {cart.length > 0 && (
        <div className="mt-10 p-4 bg-white rounded-lg shadow-md border-t">
          <div className="flex justify-between text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>
              $
              {cart
                .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>

      )}

      {/* Proceed to Checkout Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg"
            onClick={() => navigate('/order-summary')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

    </div>
  );
};

export default CustomerCartPage;
