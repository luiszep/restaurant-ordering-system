import React from 'react';

const RestaurantCard = ({
  restaurant,
  onNavigate,
  onRename,
  onAddLogo,
  onDelete,
  isDropdownOpen,
  toggleDropdown
}) => {
  return (
    <div className="relative overflow-visible bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-xl p-8 shadow-lg flex flex-col items-center w-96">
      {/* Restaurant Card Content */}
      <div
        onClick={() => onNavigate(restaurant.id)}
        className="text-white text-center mb-4 cursor-pointer"
      >
        <h2 className="text-xl font-bold uppercase mb-6">{restaurant.name}</h2>
        <img
          src={restaurant.logo || "/images/restaurant.png"}
          alt="Restaurant Logo"
          className="w-44 h-44 object-contain mx-auto"
        />
      </div>

      {/* Three Dot Menu Button */}
      <div className="absolute bottom-4 right-4">
        <div className="relative group">
          <button
            onClick={toggleDropdown}
            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg font-bold flex items-center justify-center focus:outline-none"
          >
            &#8230;
          </button>

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition duration-200">
            Restaurant Actions
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => onRename(restaurant)}
              >
                Rename Restaurant
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => onAddLogo(restaurant)}
              >
                Add Logo
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={onDelete}
              >
                Delete Restaurant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
