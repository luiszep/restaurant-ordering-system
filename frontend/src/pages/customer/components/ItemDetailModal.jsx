import React from 'react';

const ItemDetailModal = ({ item, onClose, onAddToCart }) => {
    if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm mx-auto p-4 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        {/* Item Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}

        {/* Item Name */}
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>

        {/* Item Description */}
        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}

        {/* Price */}
        <div className="text-xl font-bold mb-6">${item.price}</div>

        {/* Add to Cart Button */}
        <button
					onClick={() => onAddToCart(item)}
					className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
					>
					Add to Cart
					</button>
					
      </div>
    </div>
  );
};

export default ItemDetailModal;
