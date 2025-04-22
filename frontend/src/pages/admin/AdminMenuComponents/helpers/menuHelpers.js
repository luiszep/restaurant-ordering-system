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
  
  export const saveNewItemName = (e, setEditingItem) => {
    const name = e.target.value.trim();
    setEditingItem(prev => ({
      ...prev,
      name
    }));
  };
  
  export const saveNewItemPrice = (e, setEditingItem) => {
    const raw = e.target.value.trim();
    const parsed = raw.replace(/[^0-9.]/g, '');
    setEditingItem(prev => ({
      ...prev,
      price: parsed
    }));
  };
  
  export const saveNewItemDescription = (e, setEditingItem) => {
    const description = e.target.value.trim();
    setEditingItem(prev => ({
      ...prev,
      description
    }));
  };  
  