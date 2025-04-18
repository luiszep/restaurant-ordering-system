import React from 'react';

const IngredientEditor = ({
    type, // "customizable" | "addable" | "notes"
    editingItem,
    setEditingItem,
    showInput,
    setShowInput,
    hoveredIndex,
    setHoveredIndex,
    label // Optional: override label text
  }) => {
    const capitalized =
    type === 'customizable' ? 'Customizable' :
    type === 'addable' ? 'Addable' :
    type === 'tags' ? 'Tags' :
    '';
  
    const hasKey = type === 'tags' ? 'hasTags' : `has${capitalized}Ingredients`;
    const ingredientsKey = type === 'tags' ? 'tags' : `${type}Ingredients`;
    const newKey = type === 'tags' ? 'newTag' : `new${capitalized}Ingredient`;    

  return (
    <>
      {/* Toggle Button */}
      {!editingItem[hasKey] && (
        <button
          onClick={() =>
            setEditingItem(prev => ({
              ...prev,
              [hasKey]: true,
              [ingredientsKey]: prev[ingredientsKey] ?? []
            }))
          }
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
            + Add {type === 'tags' ? 'Tags' : `${capitalized} Ingredients`}
        </button>
      )}

      {/* Ingredients Input Block */}
      {editingItem[hasKey] && (
        <div style={{ marginTop: '0px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2px'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {label || `Add Optional ${capitalized} Ingredients:`}
            </span>
            <button
              onClick={() => {
                setEditingItem(prev => ({
                  ...prev,
                  [hasKey]: false,
                  [ingredientsKey]: [],
                  [newKey]: ''
                }));
                setShowInput(false);
              }}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                color: '#444'
              }}
            >
              ❌ Remove All
            </button>
          </div>

          {/* Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '2px'
            }}
          >
            {editingItem[ingredientsKey].map((ingredient, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (hoveredIndex === idx) {
                    const updated = [...editingItem[ingredientsKey]];
                    updated.splice(idx, 1);
                    setEditingItem(prev => ({
                      ...prev,
                      [ingredientsKey]: updated
                    }));
                  }
                }}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  fontSize: '13px',
                  color: '#333',
                  cursor: hoveredIndex === idx ? 'pointer' : 'default',
                  transition: 'background-color 0.2s ease-in-out'
                }}
              >
                {hoveredIndex === idx ? (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Remove</span>
                ) : (
                  ingredient
                )}
              </div>
            ))}

            {/* Inline Input or +Add Button */}
            {showInput ? (
              <input
                type="text"
                autoFocus
                placeholder="Type and press Enter"
                value={editingItem[newKey] || ''}
                onChange={(e) =>
                  setEditingItem(prev => ({
                    ...prev,
                    [newKey]: e.target.value
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editingItem[newKey]?.trim()) {
                    setEditingItem(prev => ({
                      ...prev,
                      [ingredientsKey]: [
                        ...prev[ingredientsKey],
                        prev[newKey].trim()
                      ],
                      [newKey]: ''
                    }));
                    setShowInput(false);
                  } else if (e.key === 'Escape') {
                    setShowInput(false);
                  }
                }}
                onBlur={() => setShowInput(false)}
                style={{
                  padding: '6px 10px',
                  fontSize: '13px',
                  borderRadius: '12px',
                  border: '1px solid #ccc',
                  minWidth: '160px'
                }}
              />
            ) : (
            <button
            onClick={() => setShowInput(true)}
            style={{
                backgroundColor: '#f5f5f5',
                color: '#555',
                border: '1px dashed #bbb',
                borderRadius: '12px',
                padding: '6px 10px',
                fontSize: '13px',
                cursor: 'pointer'
            }}
            >
            + Add Another {type === 'tags' ? 'Tag' : 'Ingredient'}
            </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientEditor;
