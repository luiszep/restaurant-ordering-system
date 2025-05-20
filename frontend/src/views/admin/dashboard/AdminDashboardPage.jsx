import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileBlockMessage from '../../../components/MobileBlockMessage';
import RestaurantModal from './modals/RestaurantModal';
import AddLogoModal from './modals/AddLogoModal';
import DeleteRestaurantModal from './modals/DeleteRestaurantModal';
import RestaurantCard from './components/RestaurantCard';
import useRestaurantModals from './hooks/useRestaurantModals';

const AdminDashboardPage = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const {
  showModal,
  newRestaurantName,
  setNewRestaurantName,
  error,
  setError,
  editingRestaurantId,
  showLogoModal,
  restaurantForLogo,
  showDeleteModal,
  restaurantToDelete,
  setShowDeleteModal,
  setRestaurantToDelete,
  handleCreateNewRestaurant,
  handleRenameRestaurant,
  handleAddLogoClick,
  handleSaveLogo,
  handleDeleteRestaurant,
  handleSave,
  handleCancelModal,
  handleCloseLogoModal,
  handleCloseDeleteModal
  } = useRestaurantModals(restaurants, setRestaurants);

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

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-[140vh] bg-gray-900 text-white px-10 py-12 pb-32">
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
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onNavigate={handleRestaurantClick}
              onRename={handleRenameRestaurant}
              onAddLogo={handleAddLogoClick}
              onDelete={() => {
                setRestaurantToDelete(restaurant);
                setShowDeleteModal(true);
              }}
              isDropdownOpen={activeDropdown === restaurant.id}
              toggleDropdown={() =>
                setActiveDropdown((prev) => (prev === restaurant.id ? null : restaurant.id))
              }
            />
          ))}
        </div>
      </div>

      {/* Modal for Adding New Restaurant */}
      {showModal && (
        <RestaurantModal
          title={editingRestaurantId ? 'Rename Restaurant' : 'Create New Restaurant'}
          value={newRestaurantName}
          onChange={(e) => {
            setNewRestaurantName(e.target.value);
            setError('');
          }}
          onSave={handleSave}
          onCancel={handleCancelModal}
          error={error}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSave();
            }
          }}
        />
      )}

      {/* Modal for Adding Restaurant Logo */}
      {showLogoModal && restaurantForLogo && (      
        <AddLogoModal
          isOpen={showLogoModal}
          onClose={handleCloseLogoModal}
          onSave={handleSaveLogo}
        />
      )}

      {/* Modal for Deleting Restaurant */}
      {showDeleteModal && restaurantToDelete && (
        <DeleteRestaurantModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteRestaurant}
          restaurantName={restaurantToDelete.name}
        />
      )}

      {/* Mobile Message */}
      <MobileBlockMessage />
    </>
  );
};

export default AdminDashboardPage;
