import React from 'react';

const AddItemCard = ({
  editingItem,
  imageInputRef,
  handleEditChange,
  handleImageDrop,
  allowDrop,
  saveNewItemName,
  saveNewItemPrice,
  saveNewItemDescription,
  handleSaveEdit,
  setZoomImage,
  setEditingItem,
  handleSaveNewItem
}) => {
  if (!editingItem || editingItem.type !== 'new') return null;

  return (     
        <div
        style={{
          width: '100%',
          maxWidth: '850px',
          margin: '0 auto'
        }}
        >
        <div className="new-item-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* New Item Name Input */}
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

        {/* New Item Price Input */}
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

        {/* Image Upload and Preview Area */}
        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <div
            onClick={() => imageInputRef.current?.click()}
            style={{
              width: '100%',
              height: '130px',
              minHeight: '130px',
              border: '1px dashed #ccc',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#aaa',
              fontSize: '14px',
              background: '#fdfdfd',
              overflow: 'hidden',
              cursor: 'pointer'
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

        {/* Hidden File Input for Images */}
        <input
          ref={imageInputRef}
          type="file"
          name="image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setEditingItem((prev) => ({
                ...prev,
                image: file,
                previewUrl
              }));
            }
          }}
        />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Optional Description Input */}
        <input
            name="description"
            value={editingItem.description}
            onChange={handleEditChange}
            onBlur={saveNewItemDescription}
            placeholder="Add optional description"
            style={{
              width: '100%',
              padding: '6px',
              fontSize: '14px',
              marginTop: '2px',
              boxSizing: 'border-box'
            }}
          />

          {/* Toggle Customizable Ingredients */}
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
          {/* Customizable Ingredients Fields */}
          {editingItem.hasCustomizableIngredients && (
            <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>Customizable Ingredients:</span>    


              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {editingItem.customizableIngredients.map((ingredient, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f0f0f0',
                    padding: '6px 10px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#333'
                  }}
                >
                  {ingredient}
                  <span
                    onClick={() => {
                      const updated = [...editingItem.customizableIngredients];
                      updated.splice(idx, 1);
                      setEditingItem(prev => ({
                        ...prev,
                        customizableIngredients: updated
                      }));
                    }}
                    style={{
                      marginLeft: '8px',
                      cursor: 'pointer',
                      color: '#999',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </span>                               
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type and press Enter"
              value={editingItem.newCustomIngredient || ''}
              onChange={(e) =>
                setEditingItem(prev => ({ ...prev, newCustomIngredient: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && editingItem.newCustomIngredient?.trim()) {
                  setEditingItem(prev => ({
                    ...prev,
                    customizableIngredients: [...prev.customizableIngredients, prev.newCustomIngredient.trim()],
                    newCustomIngredient: ''
                  }));
                }
              }}
              style={{
                marginTop: '8px',
                padding: '6px',
                fontSize: '13px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '6px'
              }}
            />

              {/* Button to Add Ingredient */}
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
          {/* Toggle Addable Ingredients */}
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
            {editingItem.hasAddableIngredients ? "Remove Addable Ingredients" : "Add Addable Ingredients (Sauces, etc.)"}
          </button>
          
          {/* Addable Ingredients Input Fields */}
          {editingItem.hasAddableIngredients && (
            <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>
                Addable Ingredients (Sauces, etc.):
              </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {editingItem.addableIngredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#f0f0f0',
                      padding: '6px 10px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '13px',
                      color: '#333'
                    }}
                  >
                    {ingredient}
                    <span
                      onClick={() => {
                        const updated = [...editingItem.addableIngredients];
                        updated.splice(idx, 1);
                        setEditingItem(prev => ({
                          ...prev,
                          addableIngredients: updated
                        }));
                      }}
                      style={{
                        marginLeft: '8px',
                        cursor: 'pointer',
                        color: '#999',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter"
                value={editingItem.newAddableIngredient || ''}
                onChange={(e) =>
                  setEditingItem(prev => ({ ...prev, newAddableIngredient: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editingItem.newAddableIngredient?.trim()) {
                    setEditingItem(prev => ({
                      ...prev,
                      addableIngredients: [...prev.addableIngredients, prev.newAddableIngredient.trim()],
                      newAddableIngredient: ''
                    }));
                  }
                }}
                style={{
                  marginTop: '8px',
                  padding: '6px',
                  fontSize: '13px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '6px'
                }}
              />     
              {/* Button to Add Another Ingredient */}
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
          {editingItem.hasNotes && (
            <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>
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
            <label htmlFor="specialRequestOption" style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Special Requests/Comments:
            </label>
            <select
              name="specialRequestOption"
              value={editingItem.specialRequestOption}
              onChange={(e) =>
                setEditingItem(prev => ({ ...prev, specialRequestOption: e.target.value }))
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
          {/* Save New Item Button */}
          <button
            onClick={handleSaveNewItem}
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
            Save Item
          </button>
        </div>
        </div>
        </div>
  );
};

export default AddItemCard;
