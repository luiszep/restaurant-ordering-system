// --- Helper Functions ---

// Converts a File object to a Base64-encoded data URL.
// Useful for image previews or storing images in string form.
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // Returns a default blank item object for adding a new menu item to a section.
  export const getDefaultNewItem = (sectionKey) => ({
    section: sectionKey,
    type: 'new',
    name: '',
    price: '',
    description: '',
    image: null,
    previewUrl: null,
    customizableIngredients: [],
    hasCustomizableIngredients: false,
    addableIngredients: [],
    hasAddableIngredients: false,
    notes: [],
    hasNotes: false,
    specialRequestOption: 'allow', // Options: allow | call | none
    newCustomIngredient: '',
    newAddableIngredient: ''
  });
  
  // --- Field-specific Save Helpers ---
  
  // Trims and saves new item's name
  export const saveNewItemName = () => {
    if (!editingItem?.name?.trim()) return;
    setEditingItem((prev) => ({
      ...prev,
      name: editingItem.name.trim()
    }));
  };
  
  // Formats and saves new item's price
  export const saveNewItemPrice = () => {
    if (!editingItem?.price || isNaN(editingItem.price)) return;
    const price = parseFloat(editingItem.price);
    setEditingItem((prev) => ({
      ...prev,
      price: price.toFixed(2)
    }));
  };
  
  // Trims and saves new item's description
  export const saveNewItemDescription = () => {
    setEditingItem((prev) => ({
      ...prev,
      description: editingItem.description?.trim() || ''
    }));
  };
  