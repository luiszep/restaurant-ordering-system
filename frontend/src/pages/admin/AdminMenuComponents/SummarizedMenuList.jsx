// SummarizedMenuList.jsx
import React, { useState } from 'react';

const SummarizedMenuList = ({
  menuSections,
  sectionOrder,
  setZoomImage,
  handleManualSectionReorder,
  handleManualItemReorder,
}) => {
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [sectionInputValue, setSectionInputValue] = useState('');

  const [editingItem, setEditingItem] = useState(null); // {sectionKey, itemIndex}
  const [itemInputValue, setItemInputValue] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      {sectionOrder.map((sectionKey, idx) => {
        const section = menuSections[sectionKey];

        // 🚨 Guard check: Skip if section was deleted
        if (!section) return null;

        return (
          <div key={sectionKey} style={{ marginBottom: '40px' }}>
            {/* --- Section Header --- */}
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
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setEditingSectionIndex(idx);
                  setSectionInputValue(String(idx + 1));
                }}
              >
                {editingSectionIndex === idx ? (
                  <input
                    type="number"
                    value={sectionInputValue}
                    onChange={(e) => setSectionInputValue(e.target.value)}
                    onBlur={() => {
                      const newIndex = parseInt(sectionInputValue) - 1;
                      if (!isNaN(newIndex)) {
                        handleManualSectionReorder(idx, newIndex);
                      }
                      setEditingSectionIndex(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const newIndex = parseInt(sectionInputValue) - 1;
                        if (!isNaN(newIndex)) {
                          handleManualSectionReorder(idx, newIndex);
                        }
                        setEditingSectionIndex(null);
                      }
                    }}
                    autoFocus
                    style={{
                      width: '28px',
                      height: '28px',
                      textAlign: 'center',
                      borderRadius: '50%',
                      border: '1px solid #aaa',
                    }}
                  />
                ) : (
                  idx + 1
                )}
              </span>
              {section.title}
            </h2>

            {/* --- Section Items Grid --- */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {section.items.length === 0 ? (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#888',
                    padding: '30px',
                    fontStyle: 'italic',
                  }}
                >
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
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* --- Item Reorder Number Badge --- */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#eee',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        cursor: 'pointer',
                        color: '#555',
                      }}
                      onClick={() => {
                        setEditingItem({ sectionKey, itemIndex: index });
                        setItemInputValue(String(index + 1));
                      }}
                    >
                      {editingItem?.sectionKey === sectionKey && editingItem?.itemIndex === index ? (
                        <input
                          type="number"
                          value={itemInputValue}
                          onChange={(e) => setItemInputValue(e.target.value)}
                          onBlur={() => {
                            const newIndex = parseInt(itemInputValue) - 1;
                            if (!isNaN(newIndex)) {
                              handleManualItemReorder(sectionKey, index, newIndex);
                            }
                            setEditingItem(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newIndex = parseInt(itemInputValue) - 1;
                              if (!isNaN(newIndex)) {
                                handleManualItemReorder(sectionKey, index, newIndex);
                              }
                              setEditingItem(null);
                            }
                          }}
                          autoFocus
                          style={{
                            width: '24px',
                            height: '24px',
                            textAlign: 'center',
                            borderRadius: '50%',
                            border: '1px solid #aaa',
                            fontSize: '12px',
                          }}
                        />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* --- Image, Title, Price --- */}
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
                          cursor: 'zoom-in',
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
                          marginBottom: '10px',
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
