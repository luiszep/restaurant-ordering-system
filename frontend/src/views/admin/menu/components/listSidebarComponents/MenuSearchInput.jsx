import React from 'react';

const MenuSearchInput = ({ searchTerm, setSearchTerm, placeholder = 'Search menus...' }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-500 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
    />
  </div>
);

export default MenuSearchInput;
