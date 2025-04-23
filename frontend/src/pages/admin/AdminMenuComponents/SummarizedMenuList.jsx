// File: src/pages/AdminMenuComponents/SummarizedMenuList.jsx
// Description: Displays a summarized, non-editable overview of menu sections and items.

import React from 'react';

const SummarizedMenuList = ({ menuSections, sectionOrder }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {sectionOrder.map((sectionKey) => {
        const section = menuSections[sectionKey];
        return (
          <div key={sectionKey}>
            <h3 style={{ marginBottom: '10px' }}>{section.title}</h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              {section.items.map((item, index) => (
                <div
                  key={`${sectionKey}-${index}`}
                  style={{
                    width: '250px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '10px'
                      }}
                    />
                  )}
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {item.name}
                  </h4>
                  <div style={{ color: '#777', fontSize: '14px', marginBottom: '4px' }}>
                    {item.description || 'No description'}
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummarizedMenuList;
