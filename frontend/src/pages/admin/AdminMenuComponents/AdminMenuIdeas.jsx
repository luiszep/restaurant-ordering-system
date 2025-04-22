// This is the original MenuItemCard.jsx that displayed in small boxes. 










// MenuItemCard.jsx
// This component displays a single menu item card with editable and static states.

import React from 'react';

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
    <div
      style={{
        width: '200px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#fff'
      }}
    >
      {isEditing ? (
        <>
          {/* Editable Item Name */}
          <input
            name="name"
            value={editingItem.name}
            onChange={handleEditChange}
            onBlur={saveNewItemName}
            placeholder="Add item name"
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              width: '100%',
              marginBottom: '8px'
            }}
          />

          {/* Editable Item Price */}
          <input
            name="price"
            value={editingItem.price}
            onChange={handleEditChange}
            onBlur={saveNewItemPrice}
            placeholder="$0.00"
            style={{
              fontSize: '14px',
              width: '100%',
              marginBottom: '8px'
            }}
          />

          {/* Editable Item Image */}
          <div style={{ position: 'relative', marginBottom: '8px' }}>
            <div
              onClick={() => imageInputRef.current?.click()}
              onDrop={handleImageDrop}
              onDragOver={allowDrop}
              style={{
                width: '100%',
                height: '130px',
                border: '1px dashed #ccc',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                fontSize: '14px',
                background: '#fdfdfd',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {editingItem?.previewUrl ? (
                <img
                  src={editingItem.previewUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomImage(editingItem.previewUrl);
                  }}
                />
              ) : (
                "Add Optional Image +"
              )}
            </div>
            {/* Remove Image Button */}
            {editingItem?.previewUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (editingItem.previewUrl) {
                    URL.revokeObjectURL(editingItem.previewUrl);
                  }
                  setEditingItem((prev) => ({
                    ...prev,
                    image: null,
                    previewUrl: null
                  }));
                  if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  textAlign: 'center',
                  lineHeight: '22px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
                title="Remove Image"
              >
                ×
              </button>
            )}
          </div>

          {/* Editable Item Description */}
          <input
            name="description"
            value={editingItem.description}
            onChange={handleEditChange}
            onBlur={saveNewItemDescription}
            placeholder="Add optional description"
            style={{
              width: '100%',
              fontSize: '13px',
              marginBottom: '8px'
            }}
          />

          {/* Toggle Customizable Ingredients for Existing Items */}
          <button
            onClick={() => setEditingItem(prev => ({
              ...prev,
              hasCustomizableIngredients: !prev.hasCustomizableIngredients,
              customizableIngredients: prev.hasCustomizableIngredients ? [] : ['']
            }))}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '6px',
              backgroundColor: '#e7f3ff',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            {editingItem.hasCustomizableIngredients ? "Remove Customizable Ingredients" : "Add Customizable Ingredients"}
          </button>

          {/* Customizable Ingredients Input Fields */}
          {editingItem.hasCustomizableIngredients && (
            <div
              style={{
                marginTop: '8px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  display: 'block'
                }}
              >
                Customizable Ingredients:
              </span>

              {editingItem.customizableIngredients.map((ingredient, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Ingredient ${idx + 1}`}
                  value={ingredient}
                  onChange={(e) => {
                    const updatedIngredients = [...editingItem.customizableIngredients];
                    updatedIngredients[idx] = e.target.value;
                    setEditingItem(prev => ({
                      ...prev,
                      customizableIngredients: updatedIngredients
                    }));
                  }}
                  style={{
                    width: '100%',
                    marginBottom: '6px',
                    padding: '4px',
                    fontSize: '13px'
                  }}
                />
              ))}

              {/* Button to Add Another Ingredient */}
              <button
              onClick={() => setEditingItem(prev => ({
                ...prev,
                customizableIngredients: [...prev.customizableIngredients, '']
              }))}
              style={{
                marginTop: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Add Another Ingredient
            </button>
          </div>
        )}

        {/* Toggle Addable Ingredients for Existing Items */}
        <button
          onClick={() => setEditingItem(prev => ({
            ...prev,
            hasAddableIngredients: !prev.hasAddableIngredients,
            addableIngredients: prev.hasAddableIngredients ? [] : ['']
          }))}
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '6px',
            backgroundColor: '#e7ffe7',
            color: '#28a745',
            border: '1px solid #28a745',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {editingItem.hasAddableIngredients
            ? "Remove Addable Ingredients"
            : "Add Addable Ingredients (Sauces, etc.)"}
        </button>

        {/* Addable Ingredients Input Fields */}
        {editingItem.hasAddableIngredients && (
          <div
            style={{
              marginTop: '8px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '6px',
                display: 'block'
              }}
            >
              Addable Ingredients (Sauces, etc.):
            </span>

            {editingItem.addableIngredients.map((ingredient, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Addable Ingredient ${idx + 1}`}
                value={ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...editingItem.addableIngredients];
                  updatedIngredients[idx] = e.target.value;
                  setEditingItem(prev => ({
                    ...prev,
                    addableIngredients: updatedIngredients
                  }));
                }}
                style={{
                  width: '100%',
                  marginBottom: '6px',
                  padding: '4px',
                  fontSize: '13px'
                }}
              />
            ))}

            {/* Button to Add Another Addable Ingredient */}
            <button
              onClick={() => setEditingItem(prev => ({
                ...prev,
                addableIngredients: [...prev.addableIngredients, '']
              }))}
              style={{
                marginTop: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Add Another Addable Ingredient
            </button>
          </div>
        )}
        {/* Toggle Notes */}
        <button
          onClick={() => setEditingItem(prev => ({
            ...prev,
            hasNotes: !prev.hasNotes,
            notes: prev.hasNotes ? [] : ['']
          }))}
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '6px',
            backgroundColor: '#fff4e6',
            color: '#ff8c00',
            border: '1px solid #ff8c00',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {editingItem.hasNotes ? "Remove Notes" : "Add Optional Notes (Tags)"}
        </button>

        {/* Input Fields for Notes */}
        {editingItem.hasNotes && (
          <div
            style={{
              marginTop: '8px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '6px',
                display: 'block'
              }}
            >
              Optional Notes (Tags):
            </span>

            {editingItem.notes.map((note, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Note ${idx + 1}`}
                value={note}
                onChange={(e) => {
                  const updatedNotes = [...editingItem.notes];
                  updatedNotes[idx] = e.target.value;
                  setEditingItem(prev => ({
                    ...prev,
                    notes: updatedNotes
                  }));
                }}
                style={{
                  width: '100%',
                  marginBottom: '6px',
                  padding: '4px',
                  fontSize: '13px'
                }}
              />
            ))}

            {/* Button to Add Another Note */}
            <button
              onClick={() => setEditingItem(prev => ({
                ...prev,
                notes: [...prev.notes, '']
              }))}
              style={{
                marginTop: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#ff8c00',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Add Another Note
            </button>
          </div>
        )}

        {/* Special Request Dropdown */}
        <div style={{ marginTop: '10px' }}>
          <label
            htmlFor="specialRequestOption"
            style={{
              fontSize: '13px',
              fontWeight: 'bold'
            }}
          >
            Special Requests/Comments:
          </label>
          <select
            name="specialRequestOption"
            value={editingItem.specialRequestOption}
            onChange={(e) =>
              setEditingItem(prev => ({
                ...prev,
                specialRequestOption: e.target.value
              }))
            }
            style={{
              width: '100%',
              padding: '6px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '6px'
            }}
          >
            <option value="allow">Allow Special Requests/Comments</option>
            <option value="call">Call Server for Special Requests</option>
            <option value="none">Do Not Accept Special Requests</option>
          </select>
        </div>

        {/* Hidden File Input for Item Image */}
        <input
          ref={imageInputRef}
          type="file"
          name="image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleEditChange}
        />
        {/* Save Changes Button */}
        <button
          onClick={handleSaveEdit}
          disabled={
            !editingItem.name ||
            !editingItem.price ||
            isNaN(editingItem.price) ||
            Number(editingItem.price) <= 0
          }
          style={{
            marginTop: '8px',
            width: '100%',
            padding: '6px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor:
              editingItem.name &&
              editingItem.price &&
              !isNaN(editingItem.price) &&
              Number(editingItem.price) > 0
                ? 'pointer'
                : 'not-allowed',
            fontSize: '14px',
            opacity:
              editingItem.name &&
              editingItem.price &&
              !isNaN(editingItem.price) &&
              Number(editingItem.price) > 0
                ? 1
                : 0.5
          }}
        >
          Save Changes
        </button>

        {/* Cancel Editing Button */}
        <button
          onClick={() => setEditingItem(null)}
          style={{ width: '100%', marginTop: '5px' }}
        >
          Cancel
        </button>
      </>
    ) : (
      <>
        {/* Static Display: Item Name and Price */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '6px'
          }}
        >
          <span>{item.name}</span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 'normal',
              color: '#333'
            }}
          >
            ${parseFloat(item.price).toFixed(2)}
          </span>
        </div>

        {/* Static Display: Item Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '130px',
              objectFit: 'cover',
              borderRadius: '6px',
              marginBottom: '6px',
              cursor: 'zoom-in'
            }}
            onClick={() => setZoomImage(item.image)}
          />
        )}

        {/* Static Display: Item Description */}
        {item.description && (
          <div
            style={{
              fontSize: '13px',
              color: '#555',
              marginBottom: '8px'
            }}
          >
            {item.description}
          </div>
        )}
        {item.customizableIngredients && item.customizableIngredients.length > 0 && (
          <div style={{ marginTop: '6px', fontSize: '13px' }}>
            <strong>Customizable Ingredients:</strong>
            <ul style={{ paddingLeft: '18px', margin: '4px 0' }}>
              {item.customizableIngredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        )}
        {item.addableIngredients && item.addableIngredients.length > 0 && (
          <div style={{ marginTop: '6px', fontSize: '13px' }}>
            <strong>Addable Ingredients (Sauces, etc.):</strong>
            <ul style={{ paddingLeft: '18px', margin: '4px 0' }}>
              {item.addableIngredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        )}
        {item.notes && item.notes.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '13px' }}>
            <strong>Optional Notes:</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.notes.map((note, idx) => (
                <span key={idx} style={{
                  backgroundColor: '#f2f2f2',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#333'
                }}>
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}
        {item.specialRequestOption && (
          <div style={{ marginTop: '6px', fontSize: '13px' }}>
            <strong>Special Request Option:</strong>{' '}
            {item.specialRequestOption === 'allow'
              ? 'Allow Special Requests/Comments'
              : item.specialRequestOption === 'call'
              ? 'Call Server for Special Requests'
              : 'Do Not Accept Special Requests'}
          </div>
        )}

        {/* Edit and Delete Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={() =>
              handleEditItem(sectionKey, index)
            }
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Edit
          </button>
          <button
            onClick={() =>
              handleDeleteItem(sectionKey, index)
            }
            style={{
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
  );
};

export default MenuItemCard;
