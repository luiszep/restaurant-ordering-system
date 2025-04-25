// File: src/pages/AdminMenuPage.jsx
// Description: Admin interface for managing restaurant menu sections and items.

// --- Imports ---
import React, { useState, useRef } from 'react';
import MenuSectionList from './AdminMenuComponents/MenuSectionList';
import {
  fileToBase64,
  getDefaultNewItem,
  saveNewItemName,
  saveNewItemPrice,
  saveNewItemDescription
} from './AdminMenuComponents/helpers/menuHelpers';
import DeleteSectionModal from './AdminMenuComponents/modals/DeleteSectionModal';
import ImageZoomModal from './AdminMenuComponents/modals/ImageZoomModal';
import MenuViewToggle from './AdminMenuComponents/MenuViewToggle';
import SummarizedMenuList from './AdminMenuComponents/SummarizedMenuList';


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
  
  const [menuSections, setMenuSections] = useState(initialSections);         // Menu data
  const [sectionOrder, setSectionOrder] = useState(Object.keys(initialSections)); // Order of sections

  const [editingTitles, setEditingTitles] = useState({});                     // Tracks which section titles are in edit mode
  const [editingItem, setEditingItem] = useState(null);                       // The currently edited item

  const [sectionCounter, setSectionCounter] = useState(2);                   // Counter for creating new section keys

  const [sectionToDelete, setSectionToDelete] = useState(null);             // Key of section to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);            // Show/hide confirmation modal
  const [zoomImage, setZoomImage] = useState(null);    
  // Image source for zoom preview

  const imageInputRef = useRef(null);                                        // Ref for image file input

  const [viewMode, setViewMode] = useState('detailed');

  // --- Item Deletion ---
  const handleDeleteItem = (section, index) => {
    const updated = { ...menuSections };
    updated[section].items.splice(index, 1);
    setMenuSections(updated);
  };

  // --- Start Editing Existing Item ---
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
      tags: item.tags || [],
      hasTags: item.tags && item.tags.length > 0,
      specialRequestOption: item.specialRequestOption || 'allow',
      newCustomIngredient: '',
      newAddableIngredient: '',
      newTag: ''      
    }); 
  };

  // --- Handle Input Change While Editing Item ---
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

  // Handle Drag-and-Drop Image Upload
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

  // Allow File Drop Behavior
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // --- Save Edited Item ---
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
      tags: editingItem.hasTags
        ? editingItem.tags.filter(tag => tag.trim() !== '')
        : [],      
      specialRequestOption: editingItem.specialRequestOption || 'allow',
    };    

    setMenuSections(updated);
    setEditingItem(null);
  };

  // --- Section Title Editing ---

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
    setSectionOrder((prev) => [...prev, newKey]);
    setSectionCounter((prev) => prev + 1);
  };

  // Deletes an entire section and cleans related state
  const handleDeleteSection = (sectionKey) => {
    const updatedSections = { ...menuSections };

    delete updatedSections[sectionKey];

    setMenuSections(updatedSections);

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
    if (result.type === 'section') {
      if (!result.destination) return;
      const newOrder = Array.from(sectionOrder);
      const [moved] = newOrder.splice(result.source.index, 1);
      newOrder.splice(result.destination.index, 0, moved);

      setSectionOrder(newOrder);

    } else if (result.type === 'item') {
      handleItemDragEnd(result);
    }
  };

  const handleManualSectionReorder = (oldIndex, newIndex) => {
    if (
      newIndex < 0 ||
      newIndex >= sectionOrder.length ||
      newIndex === oldIndex
    ) return;
  
    const newOrder = Array.from(sectionOrder);
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
  
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
        tags: editingItem.hasTags
        ? editingItem.tags.filter(tag => tag.trim() !== '')
        : [],      
      specialRequestOption: editingItem.specialRequestOption || 'allow',
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

  // ----- Handle Item Dragging -------
  const handleItemDragEnd = (result) => {
    const { source, destination, type } = result;
  
    // Exit early if dropped outside a droppable
    if (!destination || type !== "item") return;
  
    // Exit if item didn't move
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;
  
    const sectionKey = source.droppableId;
    const updatedSections = { ...menuSections };
    const items = Array.from(updatedSections[sectionKey].items);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);
    updatedSections[sectionKey].items = items;
  
    setMenuSections(updatedSections);
  };  

  // --- UI Rendering ---
  return (
    <>
      {/* Main Menu Management Container */}
      <div style={{ padding: '0px' }}>
        <h2>Menu Management</h2>
        <MenuViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        {viewMode === 'detailed' ? (
        <MenuSectionList
          key = "detailed"
          sectionOrder={sectionOrder}
          menuSections={menuSections}
          editingTitles={editingTitles}
          editingItem={editingItem}
          imageInputRef={imageInputRef}
          handleTitleChange={handleTitleChange}
          handleTitleBlur={handleTitleBlur}
          toggleEditingTitle={toggleEditingTitle}
          setEditingItem={setEditingItem}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          getDefaultNewItem={getDefaultNewItem}
          handleSaveNewItem={handleSaveNewItem}
          handleEditChange={handleEditChange}
          handleImageDrop={handleImageDrop}
          allowDrop={allowDrop}
          saveNewItemName={saveNewItemName}
          saveNewItemPrice={saveNewItemPrice}
          saveNewItemDescription={saveNewItemDescription}
          setZoomImage={setZoomImage}
          setShowDeleteModal={setShowDeleteModal}
          setSectionToDelete={setSectionToDelete}
          handleSaveEdit={handleSaveEdit}
          handleDragEnd={handleDragEnd}
        />

      ) : (
        <SummarizedMenuList
          menuSections={menuSections}
          sectionOrder={sectionOrder}
          setZoomImage={setZoomImage}
          handleManualSectionReorder={handleManualSectionReorder}
          key="summarized"
        />
      )}

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

      {/* Confirmation Modal for Section Deletion */}
      <DeleteSectionModal
        showDeleteModal={showDeleteModal}
        sectionToDelete={sectionToDelete}
        handleDeleteSection={handleDeleteSection}
        setShowDeleteModal={setShowDeleteModal}
        setSectionToDelete={setSectionToDelete}
      />

      {/* Modal for Zoomed Image View */}
      <ImageZoomModal 
        zoomImage={zoomImage} 
        setZoomImage={setZoomImage} 
      />
    </>
  );
};

export default AdminMenuPage;
