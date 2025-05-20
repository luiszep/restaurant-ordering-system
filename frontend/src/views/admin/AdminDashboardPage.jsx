import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from '../../components/MobileBlockMessage';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [error, setError] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('adminRestaurants');
    if (stored) {
      setRestaurants(JSON.parse(stored));
    } else {
      // Start with an empty list — no default restaurant
      setRestaurants([]);
      localStorage.setItem('adminRestaurants', JSON.stringify([]));
    }
  }, []);

  const handleRestaurantClick = (id) => {
    navigate(`/admin/restaurant/${id}`);
  };

  const handleCreateNewRestaurant = () => {
    setShowModal(true);
    setNewRestaurantName('');
    setError('');
  };

  const handleSave = () => {
    const trimmed = newRestaurantName.trim();
    if (trimmed === '') {
      setError('Please enter a restaurant name.');
      return;
    }

    const isDuplicate = restaurants.some(
      (r) => r.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      setError('No two restaurants can be named the same. Change the name to proceed.');
      return;
    }

    const newRestaurant = {
      id: `restaurant-${Date.now()}`,
      name: trimmed
    };

    const updatedList = [...restaurants, newRestaurant];
    setRestaurants(updatedList);
    localStorage.setItem('adminRestaurants', JSON.stringify(updatedList));
    setShowModal(false);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-gray-900 text-white px-10 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Restaurants</h1>
            <p className="text-gray-400 text-lg">
              View and manage all your restaurants in one place.
            </p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300"
            onClick={handleCreateNewRestaurant}
          >
            + Create New Restaurant
          </button>
        </div>

        {/* Cards */}
        <div className="flex gap-8 flex-wrap">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant.id)}
              className="bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-xl p-8 cursor-pointer shadow-lg flex flex-col items-center w-96"
            >
              <div className="text-white text-center mb-4">
                <h2 className="text-xl font-bold uppercase mb-6">{restaurant.name}</h2>
                <img
                  src="/images/restaurant.png"
                  alt="Restaurant Icon"
                  className="w-44 h-44 object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding New Restaurant */}
      {showModal && (
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-98">
            <h2 className="text-2xl font-bold mb-4">Create New Restaurant</h2>
            <input
              type="text"
              placeholder="Enter restaurant name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              value={newRestaurantName}
              onChange={(e) => {
                setNewRestaurantName(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent default form submission behavior
                  handleSave();
                }
              }}
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Message */}
      <MobileBlockMessage />
    </>
  );
};

export default AdminDashboardPage;
