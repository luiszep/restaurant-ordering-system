import React from 'react';

const DisplayItemCard = ({
  item,
  sectionKey,
  index,
  setZoomImage,
  handleEditItem,
  handleDeleteItem
}) => {
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
    {/* LEFT COLUMN */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {/* Image and Tags */}

        {/* Static Display: Item Image */}
        <div
          style={{
            width: '100%',
            height: '180px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item.image ? 'transparent' : '#f8f8f8',
            color: '#999',
            fontSize: '14px',
            cursor: item.image ? 'zoom-in' : 'default',
            overflow: 'hidden'
          }}
          onClick={() => item.image && setZoomImage(item.image)}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
          ) : (
            'No Image Provided'
          )}
          </div>

          <div style={{ marginTop: '0px', fontSize: '16px' }}>
          <strong style={{ fontWeight: 'bold' }}>OPTIONAL TAGS</strong>
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px'
            }}
          >
            {item.tags?.length > 0 ? (
              item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#e0e0e0',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: '#444'
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '15px', color: '#999' }}>N/A</span>
            )}
          </div>
        </div>

    </div>

    {/* RIGHT COLUMN */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {/* Name, price, description, ingredients, special requests, and buttons here */}
      
      {/* Static Display: Item Name and Price */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '20px',
          marginBottom: '0px'
        }}
        >
        <span style={{ flex: 1, marginRight: '12px' }}>{item.name}</span>
        <div
            style={{
            display: 'flex',
            alignItems: 'center',            
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333'
            }}
        >
            ${parseFloat(item.price).toFixed(2)}
        </div>
        </div>

        {/* Static Display: Item Description */}
        <div
            style={{
            fontSize: '15px',
            color: '#555',
            marginBottom: '0px'
            }}
        >
          {item.description?.trim() ? item.description : 'No description provided'}
          </div>

        {/* Static Display: Customizable Ingredients */}
        <div style={{ marginTop: '2px', fontSize: '16px' }}>
        <strong style={{ fontWeight: 'bold' }}>CUSTOMIZABLE INGREDIENTS:</strong>
        <div
          style={{
            marginTop: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }}
        >
          {item.customizableIngredients?.length > 0 ? (
            item.customizableIngredients.map((ing, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: '#e0e0e0',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                {ing}
              </span>
            ))
          ) : (
            <span style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>N/A</span>
          )}
        </div>
      </div>

        {/* Static Display: Addable Ingredients */}
        <div style={{ marginTop: '2px', fontSize: '16px' }}>
          <strong style={{ fontWeight: 'bold' }}>ADDABLE INGREDIENTS:</strong>
          <div
            style={{
              marginTop: '0px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px'
            }}
          >
            {item.addableIngredients?.length > 0 ? (
              item.addableIngredients.map((ing, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#e0e0e0',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: '#444'
                  }}
                >
                  {ing}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '13px', color: '#999', marginBottom: '10px' }}>N/A</span>
            )}
          </div>
        </div>

      {item.specialRequestOption && (
        <div style={{ marginTop: '2px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0px' }}>
            SPECIAL REQUESTS:
          </div>
          <div style={{ fontSize: '15px', color: '#444' }}>
            {item.specialRequestOption === 'allow'
              ? 'Allow Special Requests/Comments'
              : item.specialRequestOption === 'call'
              ? 'Call Server for Special Requests'
              : 'Do Not Accept Special Requests'}
          </div>
        </div>
      )}

        {/* Edit and Delete Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end', // 👈 Pushes to right
            gap: '8px',                 // 👈 Space between buttons
            marginTop: 'auto',          // 👈 Pushes to bottom of the column
            paddingTop: '2px'          // 👈 Adds spacing from content above
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
        </div>
</div>
</div>
    );
  };
  
  export default DisplayItemCard;
  