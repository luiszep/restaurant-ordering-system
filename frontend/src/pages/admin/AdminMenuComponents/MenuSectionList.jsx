// --- Imports ---
import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import SectionCard from './SectionCard';

// --- MenuSectionList Component ---
// This component handles rendering all draggable menu sections
// It uses DragDropContext and Droppable from the drag-and-drop library
// to allow reordering of sections by the admin
const MenuSectionList = ({
  sectionOrder,
  menuSections,
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
  handleDragEnd
}) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', marginTop: '30px' }}>
      {/* Initialize Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                position: 'relative',
                overflow: 'hidden',
                paddingBottom: '60px',
              }}
            >
              {/* Render each section using SectionCard */}
              {sectionOrder.map((sectionKey, index) => {
                return (
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
                    setZoomImage={setZoomImage}
                    setShowDeleteModal={setShowDeleteModal}
                    setSectionToDelete={setSectionToDelete}
                    handleSaveEdit={handleSaveEdit}
                    totalSections={sectionOrder.length}
                  />
                );
              })}
              {/* Placeholder ensures space is kept for dragging items */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

// --- Export Component ---
export default MenuSectionList;
