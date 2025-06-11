import { useState } from 'react';

export default function useRestaurantModals(restaurants, setRestaurants) {
  const [showModal, setShowModal] = useState(false);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [error, setError] = useState('');
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);

  const [showLogoModal, setShowLogoModal] = useState(false);
  const [restaurantForLogo, setRestaurantForLogo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  const handleCreateNewRestaurant = () => {
    setShowModal(true);
    setNewRestaurantName('');
    setError('');
  };

  const handleRenameRestaurant = (restaurant) => {
    setEditingRestaurantId(restaurant.id);
    setNewRestaurantName(restaurant.name);
    setError('');
    setShowModal(true);
  };

  const handleSave = () => {
    const trimmed = newRestaurantName.trim();
    if (trimmed === '') {
      setError('Please enter a restaurant name.');
      return;
    }

    const isDuplicate = restaurants.some(
      (r) =>
        r.name.toLowerCase() === trimmed.toLowerCase() &&
        r.id !== editingRestaurantId
    );

    if (isDuplicate) {
      setError('No two restaurants can be named the same. Change the name to proceed.');
      return;
    }

    let updatedList;
    if (editingRestaurantId) {
      updatedList = restaurants.map((r) =>
        r.id === editingRestaurantId ? { ...r, name: trimmed } : r
      );
    } else {
      const newRestaurant = {
        id: `restaurant-${Date.now()}`,
        name: trimmed
      };
      updatedList = [...restaurants, newRestaurant];
    }

    setRestaurants(updatedList);
    localStorage.setItem('adminRestaurants', JSON.stringify(updatedList));
    setShowModal(false);
    setEditingRestaurantId(null);
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setEditingRestaurantId(null);
    setError('');
  };

  const handleAddLogoClick = (restaurant) => {
    setRestaurantForLogo(restaurant);
    setShowLogoModal(true);
  };

  const handleSaveLogo = (logoDataURL) => {
    const updatedList = restaurants.map((r) =>
      r.id === restaurantForLogo.id ? { ...r, logo: logoDataURL } : r
    );

    setRestaurants(updatedList);
    localStorage.setItem('adminRestaurants', JSON.stringify(updatedList));
    setShowLogoModal(false);
    setRestaurantForLogo(null);
  };

  const handleDeleteRestaurant = () => {
    const updatedList = restaurants.filter((r) => r.id !== restaurantToDelete.id);
    setRestaurants(updatedList);
    localStorage.setItem('adminRestaurants', JSON.stringify(updatedList));

    const restaurantId = restaurantToDelete.id;

    // 🧼 Clean up all restaurant-specific localStorage keys
    localStorage.removeItem(`menus-${restaurantId}`);
    localStorage.removeItem(`selectedMenuId-${restaurantId}`);
    localStorage.removeItem(`categories-restaurant-${restaurantId}`);
    localStorage.removeItem(`selectedCategoryId-${restaurantId}`);
    localStorage.removeItem(`items-restaurant-${restaurantId}`);
    localStorage.removeItem(`selectedItemId-${restaurantId}`);
    localStorage.removeItem(`modifiers-restaurant-${restaurantId}`);
    localStorage.removeItem(`selectedModifierId-${restaurantId}`);

    setShowDeleteModal(false);
    setRestaurantToDelete(null);
  };

  const handleCloseLogoModal = () => {
    setShowLogoModal(false);
    setRestaurantForLogo(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRestaurantToDelete(null);
  };

  return {
    showModal,
    newRestaurantName,
    setNewRestaurantName,
    error,
    setError,
    editingRestaurantId,
    setEditingRestaurantId,

    showLogoModal,
    restaurantForLogo,
    setShowLogoModal,
    setRestaurantForLogo,

    showDeleteModal,
    restaurantToDelete,
    setShowDeleteModal,
    setRestaurantToDelete,

    handleCreateNewRestaurant,
    handleRenameRestaurant,
    handleSave,
    handleAddLogoClick,
    handleSaveLogo,
    handleCancelModal,
    handleDeleteRestaurant,
    handleCloseLogoModal,
    handleCloseDeleteModal
  };
}
