import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const AdminMenuPage = () => {
    const initialSections = {
        section1: {
            title: "Name this section (e.g., Appetizers, Mains, etc.)",
            items: []
        }
    };  
    
    const [menuSections, setMenuSections] = useState(initialSections);
    const [sectionOrder, setSectionOrder] = useState(Object.keys(initialSections));
    
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
    
    const [editingTitles, setEditingTitles] = useState({});
    const [editingItem, setEditingItem] = useState(null);
    
    const [sectionCounter, setSectionCounter] = useState(2); // starts at 2 since section1 exists
    const [showTip, setShowTip] = useState(() => {
        return !localStorage.getItem('adminMenuRenameTipShown');
    });  
    
    const [sectionToDelete, setSectionToDelete] = useState(null); // stores the section key being deleted
    const [showDeleteModal, setShowDeleteModal] = useState(false); // controls modal visibility
    
    useEffect(() => {
        if (showTip) {
            const timer = setTimeout(() => {
                setShowTip(false);
                localStorage.setItem('adminMenuRenameTipShown', 'true');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showTip]);
    
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
            [section]: {
                ...prev[section],
                items: [...prev[section].items, newItem]
            }
        }));
        
        setNewItems(prev => ({
            ...prev,
            [section]: { name: '', price: '', description: '', image: null }
        }));
    };
    
    const handleDeleteItem = (section, index) => {
        const updated = { ...menuSections };
        updated[section].items.splice(index, 1);
        setMenuSections(updated);
    };
    
    const handleEditItem = (section, index) => {
        const item = menuSections[section].items[index];
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
        updated[editingItem.section].items[editingItem.index] = { 
            name: editingItem.name,
            price: parseFloat(editingItem.price).toFixed(2),
            description: editingItem.description,
            image: img
        };
        setMenuSections(updated);
        setEditingItem(null);
    };
    
    const handleTitleChange = (e, sectionKey) => {
        const newTitle = e.target.value;
        setMenuSections(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                title: newTitle
            }
        }));
    };
    
    const toggleEditingTitle = (sectionKey) => {
        setEditingTitles(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };
    
    const handleTitleBlur = (sectionKey) => {
        setEditingTitles(prev => ({
            ...prev,
            [sectionKey]: false
        }));
    };  
    
    const handleAddSection = () => {
        const newKey = `section${sectionCounter}`;
        setMenuSections(prev => ({
            ...prev,
            [newKey]: {
                title: "Name this section (e.g., Appetizers, Mains, etc.)",
                items: []
            }
        }));
        setNewItems(prev => ({
            ...prev,
            [newKey]: {
                name: '',
                price: '',
                description: '',
                image: null
            }
        }));
        setSectionOrder(prev => [...prev, newKey]);
        setSectionCounter(prev => prev + 1);
    };
    
    const handleDeleteSection = (sectionKey) => {
        const updatedSections = { ...menuSections };
        const updatedNewItems = { ...newItems };
        delete updatedSections[sectionKey];
        delete updatedNewItems[sectionKey];
        setMenuSections(updatedSections);
        setNewItems(updatedNewItems);
        setSectionOrder(prev => prev.filter(key => key !== sectionKey));
        setEditingTitles(prev => {
            const copy = { ...prev };
            delete copy[sectionKey];
            return copy;
        });
        setEditingItem(prev => {
            if (prev?.section === sectionKey) return null;
            return prev;
        });
    };
    
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newOrder = Array.from(sectionOrder);
        const [moved] = newOrder.splice(result.source.index, 1);
        newOrder.splice(result.destination.index, 0, moved);
        setSectionOrder(newOrder);
    };  
    
    return (
    <>
    {showTip && (
      <div style={{
        backgroundColor: '#fffbe6',
        padding: '10px 15px',
        border: '1px solid #ffe58f',
        borderRadius: '8px',
        margin: '20px 30px',
        color: '#8c6d1f',
        fontSize: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <span>💡 Tip: Click section titles to rename them!</span>
      </div>
    )}
    <div style={{ padding: '30px' }}>
      <h2>Menu Management</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sectionOrder.map((sectionKey, index) => {
                const items = menuSections[sectionKey];
                return (
                <Draggable key={sectionKey} draggableId={sectionKey} index={index}>
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style, 
                      marginBottom: '20px',
                      transition: 'transform 200ms ease, box-shadow 200ms ease',
                      boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                      borderRadius: '12px',
                      background: snapshot.isDragging ? '#e6f7ff' : 'transparent',
                      zIndex: snapshot.isDragging ? 100 : 'auto'
                    }}
                  >
                    <div
                    key={sectionKey}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '20px',
                      backgroundColor: snapshot.isDragging ? '#e6f7ff' : '#f9f9f9',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1.5px solid #ccc',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    >
                      {/* Section title */}
                      <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                      }}
                      {...provided.dragHandleProps} 
                      >
                        <span
                        style={{
                          marginRight: '10px',
                          fontSize: '18px',
                          userSelect: 'none',
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
                              e.preventDefault(); // optional: prevents newline/submission
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
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          cursor: 'pointer'
                        }}
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
                          <h2 style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            transition: 'color 0.2s'
                            }}>
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
                      {/* Input Box */}
                      <div style={{
                        border: '2px dashed gray',
                        padding: '15px',
                        width: '300px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        background: '#fff'
                        }}>
                          <input
                          name="name"
                          placeholder="Item"
                          value={newItems[sectionKey].name}
                          onChange={(e) => handleInputChange(e, sectionKey)}
                          style={{ width: '100%', marginBottom: '8px' }}
                          />
                          <input
                          name="price"
                          placeholder="Price"
                          value={newItems[sectionKey].price}
                          onChange={(e) => handleInputChange(e, sectionKey)}
                          style={{ width: '100%', marginBottom: '8px' }}
                          />
                          <input
                          name="description"
                          placeholder="description field (optional)"
                          value={newItems[sectionKey].description}
                          onChange={(e) => handleInputChange(e, sectionKey)}
                          style={{
                            width: '100%',
                            marginBottom: '8px',
                            color: newItems[sectionKey].description ? 'black' : '#999'
                          }}
                          />
                          <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={(e) => handleInputChange(e, sectionKey)}
                          style={{ marginBottom: '10px' }}
                          />
                          <div style={{ fontSize: '12px', marginBottom: '10px' }}>Choose Optional Image</div>
                          <button onClick={() => handleAddItem(sectionKey)} style={{ width: '100%' }}>
                            Add
                          </button>
                      </div>
                      {/* Card Layout for Items */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        {items.items.map((item, index) => {
                          const isEditing = editingItem &&
                          editingItem.section === sectionKey &&
                          editingItem.index === index;
                          return (
                          <div key={index} style={{
                            width: '200px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '10px',
                            backgroundColor: '#fff'
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
                                <button onClick={() => handleEditItem(sectionKey, index)} style={{ width: '100%', marginBottom: '5px' }}>Edit</button>
                                <button onClick={() => handleDeleteItem(sectionKey, index)} style={{ width: '100%' }}>Delete</button>
                                </>
                                )
                              }
                          </div>
                          );
                        })}
                      </div>
                      {/* Bottom-right aligned Delete Section button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
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
                      </div>
                    </div>
                    </div>
                  )}
                </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Add New Section Button */}
      <div
      onClick={handleAddSection}
      style={{
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#007bff',
        fontWeight: 'bold',
        fontSize: '16px',
        borderTop: '1px dashed #ccc'
      }}
      >
        + Add New Section
      </div>
    </div>
    {showDeleteModal && (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Delete Section?</h3>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Are you sure you want to delete this section? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px', gap: '12px' }}>
            <button
              onClick={() => {
                handleDeleteSection(sectionToDelete);
                setShowDeleteModal(false);
                setSectionToDelete(null);
              }}
              style={{
                padding: '8px 20px',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSectionToDelete(null);
              }}
              style={{
                padding: '8px 20px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </>);
};

export default AdminMenuPage; 