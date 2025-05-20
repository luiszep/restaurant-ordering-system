import React from 'react';

const RestaurantModal = ({
  title,
  value,
  onChange,
  onSave,
  onCancel,
  error,
  onKeyDown
}) => {
  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-98">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <input
          type="text"
          placeholder="Enter restaurant name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
