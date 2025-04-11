// --- Imports ---
import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// --- Helper Functions ---
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Base64 string
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Initial States ---
const initialSections = {
  section1: {
    title: "Name this section (e.g., Appetizers, Mains, etc.)",
    items: []
  }
};

// --- AdminMenuPage Component ---
const AdminMenuPage = () => {
  // --- State Declarations ---
  const [menuSections, setMenuSections] = useState(initialSections);
  const [sectionOrder, setSectionOrder] = useState(Object.keys(initialSections));
  
  const [newItems, setNewItems] = useState(() => {
    const defaults = {};
    Object.keys(initialSections).forEach((section) => {
      defaults[section] = {
        name: '',
        price: '',
        description: '',
        image: null,
        customizableIngredients: [],
        hasCustomizableIngredients: false,
        addableIngredients: [],
        hasAddableIngredients: false,
        notes: [],             // <-- add this line
        hasNotes: false        // <-- and this line
      };        
    });
    return defaults;
  });
  

  const [editingTitles, setEditingTitles] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  const [sectionCounter, setSectionCounter] = useState(2); // Starts at 2 (section1 already exists)

  const [showTip, setShowTip] = useState(
    !localStorage.getItem('adminMenuRenameTipShown')
  );

  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  const imageInputRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    if (showTip) {
      const timer = setTimeout(() => {
        setShowTip(false);
        localStorage.setItem('adminMenuRenameTipShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTip]);

  // --- Handler Functions ---
  const handleInputChange = (e, section) => {
    const { name, value, files } = e.target;
    setNewItems((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: name === 'image' ? files[0] : value
      }
    }));
  };

  // Adds a new item to the specified section
  const handleAddItem = (section) => {
    const item = newItems[section];
    
    if (!item.name || !item.price || isNaN(item.price) || Number(item.price) <= 0) return;

    const newItem = {
      name: item.name,
      price: parseFloat(item.price).toFixed(2),
      description: item.description,
      image: item.image ? URL.createObjectURL(item.image) : null
    };

    setMenuSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: [...prev[section].items, newItem]
      }
    }));

    setNewItems((prev) => ({
      ...prev,
      [section]: { name: '', price: '', description: '', image: null }
    }));
  };

  // Deletes an item from a section based on index
  const handleDeleteItem = (section, index) => {
    const updated = { ...menuSections };
    updated[section].items.splice(index, 1);
    setMenuSections(updated);
  };

  // Initializes editing state for an existing item
  const handleEditItem = (section, index) => {
    const item = menuSections[section].items[index];
    setEditingItem({
      ...item,
      section,
      index,
      previewUrl: item.image || null,
      hasCustomizableIngredients: item.customizableIngredients && item.customizableIngredients.length > 0,
      customizableIngredients: item.customizableIngredients || [],
      hasAddableIngredients: item.addableIngredients && item.addableIngredients.length > 0,
      addableIngredients: item.addableIngredients || [],
      notes: item.notes || [],
      hasNotes: item.notes && item.notes.length > 0
    });    
  };

  // Handles input changes during item editing (name, price, image, etc.)
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files[0]) {
      const newPreview = URL.createObjectURL(files[0]);

      // Clean up previous image preview URL if exists
      if (editingItem?.previewUrl) {
        URL.revokeObjectURL(editingItem.previewUrl);
      }

      setEditingItem((prev) => ({
        ...prev,
        image: files[0],
        previewUrl: newPreview
      }));
    } else {
      setEditingItem((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // --- Image Handlers ---

  // Handles dropping an image file into the editing area
  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files?.[0];
    if (!file || !editingItem) return;

    const previewUrl = URL.createObjectURL(file);

    // Revoke previous preview URL if it exists
    if (editingItem.previewUrl) {
      URL.revokeObjectURL(editingItem.previewUrl);
    }

    setEditingItem((prev) => ({
      ...prev,
      image: file,
      previewUrl
    }));
  };

  // Allows drag-over functionality for image drop
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Saves edited menu item, converting image file to Base64 if needed
  const handleSaveEdit = async () => {
    const updated = { ...menuSections };
    let finalImage = editingItem.previewUrl || null;

    if (editingItem.image instanceof File) {
      finalImage = await fileToBase64(editingItem.image);
    }

    updated[editingItem.section].items[editingItem.index] = {
      name: editingItem.name,
      price: parseFloat(editingItem.price).toFixed(2),
      description: editingItem.description,
      image: finalImage,
      customizableIngredients: editingItem.hasCustomizableIngredients
        ? editingItem.customizableIngredients.filter(ing => ing.trim() !== '')
        : [],
      addableIngredients: editingItem.hasAddableIngredients
        ? editingItem.addableIngredients.filter(ing => ing.trim() !== '')
        : [],
      notes: editingItem.hasNotes
        ? editingItem.notes.filter(note => note.trim() !== '')
        : []
    };   

    setMenuSections(updated);
    setEditingItem(null);
  };

  // --- Section Title Handlers ---

  // Updates the title of a section while editing
  const handleTitleChange = (e, sectionKey) => {
    const newTitle = e.target.value;
    setMenuSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        title: newTitle
      }
    }));
  };

  // Toggles editing state for a section title
  const toggleEditingTitle = (sectionKey) => {
    setEditingTitles((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Disables editing state for a section title (on blur event)
  const handleTitleBlur = (sectionKey) => {
    setEditingTitles((prev) => ({
      ...prev,
      [sectionKey]: false
    }));
  };

  // --- Section Management Handlers ---

  // Adds a new menu section to the interface
  const handleAddSection = () => {
    const newKey = `section${sectionCounter}`;
    setMenuSections((prev) => ({
      ...prev,
      [newKey]: {
        title: "Name this section (e.g., Appetizers, Mains, etc.)",
        items: []
      }
    }));
    setNewItems((prev) => ({
      ...prev,
      [newKey]: {
        name: '',
        price: '',
        description: '',
        image: null
      }
    }));
    setSectionOrder((prev) => [...prev, newKey]);
    setSectionCounter((prev) => prev + 1);
  };

  // Deletes an entire section and cleans related state
  const handleDeleteSection = (sectionKey) => {
    const updatedSections = { ...menuSections };
    const updatedNewItems = { ...newItems };

    delete updatedSections[sectionKey];
    delete updatedNewItems[sectionKey];

    setMenuSections(updatedSections);
    setNewItems(updatedNewItems);

    setSectionOrder((prev) => prev.filter((key) => key !== sectionKey));

    setEditingTitles((prev) => {
      const copy = { ...prev };
      delete copy[sectionKey];
      return copy;
    });

    setEditingItem((prev) => (prev?.section === sectionKey ? null : prev));
  };

  // Updates order of sections after drag-and-drop event
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(sectionOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);

    setSectionOrder(newOrder);
  };

  // --- New Item Creation Handlers ---

  // Validates and saves newly created item to a section
  const handleSaveNewItem = async () => {
    if (!editingItem || editingItem.type !== 'new') return;

    const { name, price, description, image, section } = editingItem;
    const nameValid = name?.trim();
    const priceValid = price && !isNaN(price) && Number(price) > 0;

    if (!nameValid || !priceValid) return;

    let imageDataUrl = null;
    if (image instanceof File) {
      imageDataUrl = await fileToBase64(image); // Convert image to Base64
    }
    const newItem = {
      name: name.trim(),
      price: parseFloat(price).toFixed(2),
      description: description?.trim() || '',
      image: imageDataUrl,
      customizableIngredients: editingItem.hasCustomizableIngredients
        ? editingItem.customizableIngredients.filter(ing => ing.trim() !== '')
        : [],
      addableIngredients: editingItem.hasAddableIngredients
        ? editingItem.addableIngredients.filter(ing => ing.trim() !== '')
        : [],
      notes: editingItem.hasNotes
        ? editingItem.notes.filter(note => note.trim() !== '')
        : []      
    };    
    setMenuSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: [...prev[section].items, newItem]
      }
    }));

    if (imageInputRef.current) imageInputRef.current.value = '';
    setEditingItem(null);
  };

  // --- Field-specific Save Helpers ---

  // Trims and saves new item's name
  const saveNewItemName = () => {
    if (!editingItem?.name?.trim()) return;
    setEditingItem((prev) => ({
      ...prev,
      name: editingItem.name.trim()
    }));
  };

  // Formats and saves new item's price
  const saveNewItemPrice = () => {
    if (!editingItem?.price || isNaN(editingItem.price)) return;
    const price = parseFloat(editingItem.price);
    setEditingItem((prev) => ({
      ...prev,
      price: price.toFixed(2)
    }));
  };

  // Trims and saves new item's description
  const saveNewItemDescription = () => {
    setEditingItem((prev) => ({
      ...prev,
      description: editingItem.description?.trim() || ''
    }));
  };

    // --- UI Rendering ---
    return (
      <>
        {/* Tip for renaming sections */}
        {showTip && (
          <div
            style={{
              backgroundColor: '#fffbe6',
              padding: '10px 15px',
              border: '1px solid #ffe58f',
              borderRadius: '8px',
              margin: '20px 30px',
              color: '#8c6d1f',
              fontSize: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span>💡 Tip: Click section titles to rename them!</span>
          </div>
        )}
  
        {/* Main Menu Management Container */}
        <div style={{ padding: '30px' }}>
          <h2>Menu Management</h2>
  
          {/* Sections with Drag-and-Drop */}
          <div style={{ position: 'relative', overflow: 'hidden', marginTop: '30px' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      paddingBottom: '60px',
                    }}
                  >
                    {sectionOrder.map((sectionKey, index) => {
                      const items = menuSections[sectionKey];
                      return (
                        <Draggable
                          key={sectionKey}
                          draggableId={sectionKey}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                transform: provided.draggableProps.style?.transform,
                                marginBottom: '20px',
                                transition: 'transform 200ms ease, box-shadow 200ms ease',
                                boxShadow: snapshot.isDragging
                                  ? '0 4px 12px rgba(0,0,0,0.15)'
                                  : 'none',
                                borderRadius: '12px',
                                background: snapshot.isDragging ? '#e6f7ff' : 'transparent',
                                zIndex: snapshot.isDragging ? 100 : 'auto'
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  marginBottom: '20px',
                                  backgroundColor: snapshot.isDragging
                                    ? '#e6f7ff'
                                    : '#f9f9f9',
                                  padding: '20px',
                                  borderRadius: '12px',
                                  border: '1.5px solid #ccc',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                                  position: 'relative'
                                }}
                              >
                                {/* Section Title with Drag Handle */}
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                    cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                                  }}
                                  {...provided.dragHandleProps}
                                >
                                  {/* Drag handle icon */}
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
  
                                  {/* Editable section title */}
                                  {editingTitles[sectionKey] ? (
                                    <input
                                      type="text"
                                      value={menuSections[sectionKey].title}
                                      onChange={(e) =>
                                        handleTitleChange(e, sectionKey)
                                      }
                                      onBlur={() => handleTitleBlur(sectionKey)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); // prevents accidental submission
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
                                    <h2
                                      style={{
                                        margin: 0,
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        transition: 'color 0.2s'
                                      }}
                                    >
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

                              {/* Section Number Badge */}
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '10px',
                                  left: '15px',
                                  fontSize: '18px',
                                  color: '#999'
                                }}
                              >
                                {index + 1}
                              </div>

                              {/* Items Container (Card Layout) */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '15px'
                                }}
                              >
                                {/* Add New Item Card */}
                                <div
                                  style={{
                                    width: '200px',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {editingItem?.type === 'new' &&
                                  editingItem.section === sectionKey ? (
                                    <>
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
                                    {/* Optional Description Input */}
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
                                    </>
                                  ) : (
                                    // Placeholder card for adding a new item
                                    <div
                                      onClick={() =>
                                        setEditingItem({
                                          section: sectionKey,
                                          type: 'new',
                                          name: '',
                                          price: '',
                                          description: '',
                                          image: null
                                        })
                                      }
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        color: '#999',
                                        width: '100%',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {/* Placeholder for name and price */}
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between'
                                        }}
                                      >
                                        <span>Add item name</span>
                                        <span>$0.00</span>
                                      </div>

                                      {/* Placeholder for image */}
                                      <div
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
                                          margin: '8px 0',
                                          background: '#fdfdfd'
                                        }}
                                      >
                                        Add Optional Image +
                                      </div>

                                      {/* Placeholder for description */}
                                      <div
                                        style={{
                                          fontSize: '13px',
                                          color: '#999'
                                        }}
                                      >
                                        Add optional description
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* Existing Items in Section */}
                                {items.items.map((item, index) => {
                                  const isEditing =
                                    editingItem &&
                                    editingItem.section === sectionKey &&
                                    editingItem.index === index;

                                  return (
                                    <div
                                      key={index}
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
                                            <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
                                              <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>
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
                                            {editingItem.hasAddableIngredients ? "Remove Addable Ingredients" : "Add Addable Ingredients (Sauces, etc.)"}
                                          </button>

                                          {/* Addable Ingredients Input Fields */}
                                          {editingItem.hasAddableIngredients && (
                                            <div style={{ marginTop: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
                                              <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>
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
                                    })}
                                    </div>
                                    {/* Delete Section Button */}
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '20px'
                                      }}
                                    >
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
              </div>

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

            {/* Confirm Delete Section Modal */}
            {showDeleteModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '12px',
                    width: '400px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <h3 style={{ marginBottom: '15px' }}>Delete Section?</h3>
                  <p style={{ fontSize: '14px', color: '#444' }}>
                    Are you sure you want to delete this section? This action cannot be undone.
                  </p>

                  {/* Modal Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '25px',
                      gap: '12px'
                    }}
                  >
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
            {/* Image Zoom Modal */}
            {zoomImage && (
              <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
              }}
              onClick={() => setZoomImage(null)}
              >
                <img
                src={zoomImage}
                alt="Zoomed"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  cursor: 'zoom-out'
                }}
                />
              </div>
            )}
          </>
        );
      };

export default AdminMenuPage;
