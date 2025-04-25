import React, { useState } from 'react';

const SummarizedMenuList = ({ sectionOrder, menuSections, setZoomImage, handleManualSectionReorder }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      {sectionOrder.map((sectionKey, idx) => {
        const section = menuSections[sectionKey];

        return (
          <div key={sectionKey} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: '#eee',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#555',
                cursor: 'pointer'
              }}
              onClick={() => {
                setEditingIndex(idx);
                setInputValue(String(idx + 1));
              }}
            >
              {editingIndex === idx ? (
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => {
                    const newIndex = parseInt(inputValue) - 1;
                    if (!isNaN(newIndex) && newIndex !== idx) {
                      handleManualSectionReorder(idx, newIndex);
                    }
                    setEditingIndex(null);
                  }}
                  
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const newIndex = parseInt(inputValue) - 1;
                      if (!isNaN(newIndex) && newIndex !== idx) {
                        handleManualSectionReorder(idx, newIndex);
                      }
                      setEditingIndex(null);
                    }
                  }}                  
                  autoFocus
                  style={{
                    width: '28px',
                    height: '28px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    border: '1px solid #aaa'
                  }}
                />
              ) : (
                idx + 1
              )}
            </span>
              {section.title}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px'
              }}
            >
            {section.items.length === 0 ? (
              <div style={{
                width: '100%',
                textAlign: 'center',
                color: '#888',
                padding: '30px',
                fontStyle: 'italic'
              }}>
                No items in this section yet.
              </div>
            ) : (
              section.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: '250px',
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      onClick={() => setZoomImage(item.image)}
                      style={{
                        width: '100%',
                        height: '160px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        cursor: 'zoom-in'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '160px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        marginBottom: '10px'
                      }}
                    >
                      No Image
                    </div>
                  )}

                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '15px', color: '#444' }}>
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummarizedMenuList;
