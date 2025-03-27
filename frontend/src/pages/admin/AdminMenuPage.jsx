
import React, { useState } from 'react';

const AdminMenuPage = () => {
  const initialSections = {
    Appetizers: [],
    Mains: [],
    Desserts: [],
    Beverages: []
  };

  const [menuSections, setMenuSections] = useState(initialSections);
  const [newItems, setNewItems] = useState(() => {
    const defaults = {};
    for (let section in initialSections) {
      defaults[section] = {
        name: '',
        price: '',
        description: '',
        image: null
      };
    }
    return defaults;
  });

  const [editingItem, setEditingItem] = useState(null);

  const handleInputChange = (e, section) => {
    const { name, value, files } = e.target;
    setNewItems(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: name === 'image' ? files[0] : value
      }
    }));
  };

  const handleAddItem = (section) => {
    const item = newItems[section];
    if (!item.name || !item.price || isNaN(item.price) || Number(item.price) <= 0) return;

    const newItem = {
      name: item.name,
      price: parseFloat(item.price).toFixed(2),
      description: item.description,
      image: item.image ? URL.createObjectURL(item.image) : null
    };

    setMenuSections(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));

    setNewItems(prev => ({
      ...prev,
      [section]: { name: '', price: '', description: '', image: null }
    }));
  };

  const handleDeleteItem = (section, index) => {
    const updated = { ...menuSections };
    updated[section].splice(index, 1);
    setMenuSections(updated);
  };

  const handleEditItem = (section, index) => {
    const item = menuSections[section][index];
    setEditingItem({ ...item, section, index });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditingItem(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSaveEdit = () => {
    const updated = { ...menuSections };
    const img = editingItem.image instanceof File
      ? URL.createObjectURL(editingItem.image)
      : editingItem.image;

    updated[editingItem.section][editingItem.index] = {
      name: editingItem.name,
      price: parseFloat(editingItem.price).toFixed(2),
      description: editingItem.description,
      image: img
    };

    setMenuSections(updated);
    setEditingItem(null);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Menu Management</h2>
      {Object.entries(menuSections).map(([section, items]) => (
        <div key={section} style={{ marginBottom: '40px' }}>
          <h3>{section}</h3>

          <div style={{
            border: '2px dashed gray',
            padding: '15px',
            width: '300px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <input
              name="name"
              placeholder="Item"
              value={newItems[section].name}
              onChange={(e) => handleInputChange(e, section)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <input
              name="price"
              placeholder="Price"
              value={newItems[section].price}
              onChange={(e) => handleInputChange(e, section)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <input
              name="description"
              placeholder="description field (optional)"
              value={newItems[section].description}
              onChange={(e) => handleInputChange(e, section)}
              style={{ width: '100%', marginBottom: '8px', color: newItems[section].description ? 'black' : '#999' }}
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleInputChange(e, section)}
              style={{ marginBottom: '10px' }}
            />
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>Choose Optional Image</div>
            <button onClick={() => handleAddItem(section)} style={{ width: '100%' }}>
              Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {items.map((item, index) => {
              const isEditing = editingItem && editingItem.section === section && editingItem.index === index;

              return (
                <div key={index} style={{
                  width: '200px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '10px'
                }}>
                  {isEditing ? (
                    <>
                      <input
                        name="name"
                        value={editingItem.name}
                        onChange={handleEditChange}
                        style={{ width: '100%', marginBottom: '8px' }}
                      />
                      <input
                        name="price"
                        value={editingItem.price}
                        onChange={handleEditChange}
                        style={{ width: '100%', marginBottom: '8px' }}
                      />
                      <input
                        name="description"
                        value={editingItem.description}
                        onChange={handleEditChange}
                        style={{ width: '100%', marginBottom: '8px' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleEditChange}
                        style={{ marginBottom: '8px' }}
                      />
                      <button onClick={handleSaveEdit} style={{ width: '100%', marginBottom: '5px' }}>Save</button>
                      <button onClick={() => setEditingItem(null)} style={{ width: '100%' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</div>
                        <div style={{ fontSize: '14px' }}>${item.price}</div>
                      </div>
                      {item.image && (
                        <img
                          src={item.image}
                          alt="item"
                          style={{ width: '100%', borderRadius: '6px', margin: '8px 0' }}
                        />
                      )}
                      {item.description && (
                        <div style={{ fontSize: '14px', marginBottom: '8px' }}>{item.description}</div>
                      )}
                      <button onClick={() => handleEditItem(section, index)} style={{ width: '100%', marginBottom: '5px' }}>Edit</button>
                      <button onClick={() => handleDeleteItem(section, index)} style={{ width: '100%' }}>Delete</button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMenuPage;
