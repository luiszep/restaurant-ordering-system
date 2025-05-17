import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartFloatingButton = ({ cartItemCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="relative bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg"
      >
        🛒
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartFloatingButton;
