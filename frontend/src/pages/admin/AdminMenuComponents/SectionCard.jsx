// --- Imports ---
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import MenuItemCard from './MenuItemCard';
import AddItemCard from './AddItemCard';

// --- SectionCard Component ---
// Represents a draggable menu section, including:
// - Section title (editable)
// - Add new item card or placeholder
// - Menu item cards
// - Delete section button
const SectionCard = ({
  sectionKey,
  index,
  items,
  editingTitles,
  menuSections,
  editingItem,
  imageInputRef,
  snapshot,
  provided,
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
  totalSections
}) => {

  return (
    <Draggable key={sectionKey} draggableId={sectionKey} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            transform: provided.draggableProps.style?.transform,
            marginBottom: '20px',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
            boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
            borderRadius: '12px',
            background: snapshot.isDragging ? '#e6f7ff' : 'transparent',
            zIndex: snapshot.isDragging ? 100 : 'auto'
          }}
        >
          {/* --- Section Container --- */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '20px',
              backgroundColor: snapshot.isDragging ? '#e6f7ff' : '#f9f9f9',
              padding: '20px',
              borderRadius: '12px',
              border: '1.5px solid #ccc',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              position: 'relative'
            }}
          >
            {/* --- Section Title and Drag Handle --- */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                cursor: snapshot.isDragging ? 'grabbing' : 'grab'
              }}
              {...provided.dragHandleProps}
            >
              <span
                style={{
                  marginRight: '10px',
                  fontSize: '18px',
                  userSelect: 'none'
                }}
                title="Drag to reorder"
              >
                ≡
              </span>

              {editingTitles[sectionKey] ? (
                <input
                  type="text"
                  value={menuSections[sectionKey].title}
                  onChange={(e) => handleTitleChange(e, sectionKey)}
                  onBlur={() => handleTitleBlur(sectionKey)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTitleBlur(sectionKey);
                    }
                  }}
                  autoFocus
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginRight: '10px',
                    padding: '4px'
                  }}
                />
              ) : (
                <div
                  style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                  onClick={() => toggleEditingTitle(sectionKey)}
                  title="Click to rename section"
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('h2').style.color = '#666';
                    e.currentTarget.querySelector('.edit-icon').style.opacity = 1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('h2').style.color = '#000';
                    e.currentTarget.querySelector('.edit-icon').style.opacity = 0;
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 'bold',
                      transition: 'color 0.2s'
                    }}
                  >
                    {menuSections[sectionKey].title}
                  </h2>
                  <span
                    className="edit-icon"
                    style={{
                      position: 'absolute',
                      right: -25,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '16px',
                      color: '#666',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      pointerEvents: 'none'
                    }}
                  >
                    ✏️
                  </span>
                </div>
              )}
            </div>

            {/* --- Section Number Badge --- */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '15px',
                fontSize: '18px',
                color: '#999'
              }}
            >
              {index + 1}
            </div>

            {/* --- Menu Item Cards --- */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',   // Stack vertically
                alignItems: 'center',      // Center horizontally
                gap: '15px',               // Add spacing between cards
                width: '100%'
              }}
            >
            <Droppable droppableId={sectionKey} type="item">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    width: '100%'
                  }}
                >
                  {items.items.map((item, index) => (
                    <Draggable
                      key={`${sectionKey}-item-${index}`}
                      draggableId={`${sectionKey}-item-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            width: '100%',
                            maxWidth: '850px',
                            zIndex: snapshot.isDragging ? 100 : 'auto'
                          }}
                        >
                          <MenuItemCard
                            key={index}
                            item={item}
                            index={index}
                            sectionKey={sectionKey}
                            editingItem={editingItem}
                            imageInputRef={imageInputRef}
                            setEditingItem={setEditingItem}
                            handleEditItem={handleEditItem}
                            handleDeleteItem={handleDeleteItem}
                            handleEditChange={handleEditChange}
                            handleImageDrop={handleImageDrop}
                            allowDrop={allowDrop}
                            saveNewItemName={saveNewItemName}
                            saveNewItemPrice={saveNewItemPrice}
                            saveNewItemDescription={saveNewItemDescription}
                            handleSaveEdit={handleSaveEdit}
                            setZoomImage={setZoomImage}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>

            {/* --- Add Item Card --- */}
            <div style={{ marginTop: '25px' }}>
            {editingItem?.type === 'new' && editingItem.section === sectionKey ? (
              <AddItemCard
                editingItem={editingItem}
                imageInputRef={imageInputRef}
                handleEditChange={handleEditChange}
                handleImageDrop={handleImageDrop}
                allowDrop={allowDrop}
                saveNewItemName={saveNewItemName}
                saveNewItemPrice={saveNewItemPrice}
                saveNewItemDescription={saveNewItemDescription}
                handleSaveEdit={handleSaveEdit}
                setZoomImage={setZoomImage}
                setEditingItem={setEditingItem}
                handleSaveNewItem={handleSaveNewItem}
              />
            ) : items.items.length === 0 ? (
                // ⬇️ If NO items exist, show full mock card layout

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => setEditingItem(getDefaultNewItem(sectionKey))}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '24px',
                    width: '100%',
                    maxWidth: '850px',
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  }}                  
                >
                  {/* Left Side: Image & Tags Preview (Placeholder) */}
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '160px',
                        border: '1px dashed #ccc',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#aaa',
                        fontSize: '14px',
                        marginBottom: '12px'
                      }}
                    >
                      Add Optional Image +
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#000', marginBottom: '6px' }}>
                      OPTIONAL TAGS
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#f0f0f0', borderRadius: '12px', padding: '6px 10px', fontSize: '12px' }}>
                        TAG1
                      </span>
                      <span style={{ backgroundColor: '#f0f0f0', borderRadius: '12px', padding: '6px 10px', fontSize: '12px' }}>
                        TAG2
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Name, Price, Description, Ingredients, Notes */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>
                      <span>Add Item Name</span>
                      <span>$0.00</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>
                      Add optional description
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                      Add Optional Customizable Ingredients:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '6px 10px', borderRadius: '12px' }}>
                        INGREDIENT1
                      </span>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '6px 10px', borderRadius: '12px' }}>
                        INGREDIENT2
                      </span>
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                      Add Optional Addable Ingredients:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '6px 10px', borderRadius: '12px' }}>
                        INGREDIENT1
                      </span>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '6px 10px', borderRadius: '12px' }}>
                        INGREDIENT2
                      </span>
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                      SPECIAL REQUESTS
                    </div>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      Allow Special Requests/Comments
                    </div>
                  </div>
                </div>
              </div>
              
            ) : (

              // ⬇️ If at least 1 item exists, show cleaner + Add Item button
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={() => setEditingItem(getDefaultNewItem(sectionKey))}
                style={{
                  padding: '10px 20px',
                  fontSize: '15px',
                  backgroundColor: '#f4f4f4',
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  color: '#555',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  width: '850px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eaeaea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4f4f4';
                }}
              >
                + Add Item
              </button>
            </div>
            )}
            </div>

            {/* --- Delete Section Button --- */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', minHeight: '38px' }}>
            {totalSections > 1 && (
                <button
                  onClick={() => {
                    setSectionToDelete(sectionKey);
                    setShowDeleteModal(true);
                  }}
                  style={{
                    backgroundColor: '#ffdddd',
                    border: '1px solid #ffaaaa',
                    color: '#a33',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Delete Section
                </button>
            )}
            </div>

          </div>
        </div>
      )}
    </Draggable>
  );
};

// --- Export Component ---
export default SectionCard;
