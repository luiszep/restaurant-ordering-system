// --- Imports ---
import React from 'react';
import SectionCard from './SectionCard';

// --- MenuSectionList Component ---
const MenuSectionList = ({
  menuSections,
  sectionOrder,
  editingTitles,
  editingItem,
  imageInputRef,
  handleTitleChange,
  handleTitleBlur,
  toggleEditingTitle,
  setEditingItem,
  handleEditItem,
  handleDeleteItem,
  getDefaultNewItem,
  handleSaveNewItem,
  handleEditChange,
  handleImageDrop,
  allowDrop,
  saveNewItemName,
  saveNewItemPrice,
  saveNewItemDescription,
  setZoomImage,
  setShowDeleteModal,
  setSectionToDelete,
  handleSaveEdit,
}) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', marginTop: '30px' }}>
      {sectionOrder.map((sectionKey, index) => (
        <SectionCard
          key={sectionKey}
          sectionKey={sectionKey}
          index={index}
          items={menuSections[sectionKey]}
          editingTitles={editingTitles}
          menuSections={menuSections}
          editingItem={editingItem}
          imageInputRef={imageInputRef}
          handleTitleChange={handleTitleChange}
          handleTitleBlur={handleTitleBlur}
          toggleEditingTitle={toggleEditingTitle}
          setEditingItem={setEditingItem}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          getDefaultNewItem={getDefaultNewItem}
          handleSaveNewItem={handleSaveNewItem}
          handleEditChange={handleEditChange}
          handleImageDrop={handleImageDrop}
          allowDrop={allowDrop}
          saveNewItemName={saveNewItemName}
          saveNewItemPrice={saveNewItemPrice}
          saveNewItemDescription={saveNewItemDescription}
          handleSaveEdit={handleSaveEdit}
          setZoomImage={setZoomImage}
          setShowDeleteModal={setShowDeleteModal}
          setSectionToDelete={setSectionToDelete}
          totalSections={sectionOrder.length}
        />
      ))}
    </div>
  );
};

// --- Export Component ---
export default MenuSectionList;
