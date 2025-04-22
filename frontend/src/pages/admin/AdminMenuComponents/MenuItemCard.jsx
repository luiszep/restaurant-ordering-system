// MenuItemCard.jsx
// This component displays a single menu item card with editable and static states.

import React from 'react';
import EditItemCard from './EditItemCard';
import DisplayItemCard from './DisplayItemCard';


const MenuItemCard = ({
  item,
  index,
  sectionKey,
  editingItem,
  imageInputRef,
  setEditingItem,
  handleEditItem,
  handleDeleteItem,
  handleEditChange,
  handleImageDrop,
  allowDrop,
  saveNewItemName,
  saveNewItemPrice,
  saveNewItemDescription,
  handleSaveEdit,
  setZoomImage
}) => {
  // Determines if this specific menu item is currently being edited
  const isEditing =
    editingItem &&
    editingItem.section === sectionKey &&
    editingItem.index === index;

  return (
    <div>
{isEditing ? (
  <EditItemCard
    editingItem={editingItem}
    imageInputRef={imageInputRef}
    handleEditChange={handleEditChange}
    handleImageDrop={handleImageDrop}
    allowDrop={allowDrop}
    saveNewItemName={saveNewItemName}
    saveNewItemPrice={saveNewItemPrice}
    saveNewItemDescription={saveNewItemDescription}
    handleSaveEdit={handleSaveEdit}
    setEditingItem={setEditingItem}
    setZoomImage={setZoomImage}
  />

    ) : (
    <DisplayItemCard
      item={item}
      sectionKey={sectionKey}
      index={index}
      setZoomImage={setZoomImage}
      handleEditItem={handleEditItem}
      handleDeleteItem={handleDeleteItem}
    />
    )}
  </div>
  );
};

export default MenuItemCard;
