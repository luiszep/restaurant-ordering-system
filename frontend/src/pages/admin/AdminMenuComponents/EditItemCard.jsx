import React, { useState } from 'react';
import IngredientEditor from './IngredientEditor';

const EditItemCard = ({
    editingItem,
    imageInputRef,
    handleEditChange,
    handleImageDrop,
    allowDrop,
    saveNewItemName,
    saveNewItemPrice,
    saveNewItemDescription,
    handleSaveEdit,
    setEditingItem,
    setZoomImage
  }) => {
    const [showIngredientInput, setShowIngredientInput] = useState(false);
    const [hoveredIngredientIndex, setHoveredIngredientIndex] = useState(null);
    const [showAddableInput, setShowAddableInput] = useState(false);
    const [hoveredAddableIndex, setHoveredAddableIndex] = useState(null);
    const [showTagsInput, setShowTagsInput] = useState(false);
    const [hoveredTagIndex, setHoveredTagIndex] = useState(null);

        return (
          <div
            style={{
              width: '850px',
              margin: '0 auto',
              border: '1px solid #ddd', 
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              backgroundColor: '#fff',
              padding: '16px',
              minHeight: '200px'
            }}        
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '24px',
                width: '100%',
                cursor: 'default'              
              }}
            >    
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

            {/* Image Upload and Preview Area */}
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div
                onClick={() => imageInputRef.current?.click()}
                onDrop={handleImageDrop}
                onDragOver={allowDrop}
                style={{
                  width: '100%',
                  height: '180px',
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomImage(editingItem.previewUrl);
                    }}
                  />
                ) : (
                  'Add Optional Image +'
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
              onChange={handleEditChange}
            />
            
            <IngredientEditor
              type="tags"
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              showInput={showTagsInput}
              setShowInput={setShowTagsInput}
              hoveredIndex={hoveredTagIndex}
              setHoveredIndex={setHoveredTagIndex}
              label="ADD OPTIONAL TAGS:"
            />

          </div>
        
        {/* RIGHT COLUMN - Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '20px',
            marginBottom: '4px'
          }}
        >
            {/* Editable Item Name */}
            <input
              name="name"
              className="input-no-border input-title"
              value={editingItem.name}
              onChange={handleEditChange}
              onBlur={(e) => saveNewItemName(e, setEditingItem)}
              placeholder="Add item name"
              style={{
                flex: 1,
                marginRight: '12px'
              }}
            />

            {/* Editable Item Price */}
            <div className="price-input-wrapper">
              <span className="price-dollar">$</span>
              <input
                name="price"
                className="price-input"
                value={editingItem.price}
                onChange={(e) => {
                  const value = e.target.value.replace(/^\$/, '');
                  handleEditChange({ target: { name: 'price', value } });
                }}
                onBlur={(e) => saveNewItemPrice(e, setEditingItem)}
                placeholder="0.00"
              />
            </div>
            </div>

            {/* Editable Item Description */}
            <div style={{ fontSize: '13px', color: '#999' }}>
              <input
                name="description"
                className="input-no-border input-description"
                value={editingItem.description}
                onChange={handleEditChange}
                onBlur={(e) => saveNewItemDescription(e, setEditingItem)}
                placeholder="Add optional description"
                style={{
                  width: '100%',
                  fontSize: '13px',
                  color: '#999'
                }}
              />
            </div>

            <IngredientEditor
              type="customizable"
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              showInput={showIngredientInput}
              setShowInput={setShowIngredientInput}
              hoveredIndex={hoveredIngredientIndex}
              setHoveredIndex={setHoveredIngredientIndex}
            />

            <IngredientEditor
              type="addable"
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              showInput={showAddableInput}
              setShowInput={setShowAddableInput}
              hoveredIndex={hoveredAddableIndex}
              setHoveredIndex={setHoveredAddableIndex}
            />

            {/* Special Request Dropdown */}
            <div style={{ marginTop: '2px' }}>
            <label
                htmlFor="specialRequestOption"
                style={{
                fontSize: '13px',
                fontWeight: 'bold'
                }}
            >
                SPECIAL REQUESTS/COMMENTS:
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
            </div>
            </div>
      </div>

    );
  };
  
  export default EditItemCard;
  