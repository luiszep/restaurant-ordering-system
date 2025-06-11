import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CategoryListSidebar from './categories/CategoryListSidebar';
import CategoryEditorPanel from './categories/CategoryEditorPanel';
import MenuBuilderTabs from './MenuBuilderTabs';

const defaultCategories = [
  {
    id: 'cat-1',
    name: 'Sandwiches 🥪',
    autoExpand: false, // ✅ Updated from expandOnLoad
    description: '',
    items: [
      { id: 'item-1', name: 'Ham Sandwich 🥪', price: 5.99, available: true },
      { id: 'item-2', name: 'Turkey Club 🥪', price: 6.49, available: true },
      { id: 'item-3', name: 'BLT 🥓', price: 5.29, available: false },
    ],
  },
  {
    id: 'cat-2',
    name: 'Breakfast Specials 🍳',
    autoExpand: true,
    description: 'Start your day right.',
    items: [],
  },
  {
    id: 'cat-3',
    name: 'Desserts 🍰',
    autoExpand: false,
    description: '',
    items: [],
  },
];

const CategoryPage = () => {
  const { id: restaurantId } = useParams();

  const categoriesKey = `categories-restaurant-${restaurantId}`;
  const selectedCategoryKey = `selectedCategoryId-${restaurantId}`;

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem(categoriesKey);
    return stored ? JSON.parse(stored) : [...defaultCategories];
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const stored = localStorage.getItem(selectedCategoryKey);
    return stored ? JSON.parse(stored) : categories[0]?.id || null;
  });

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  useEffect(() => {
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
  }, [categories, categoriesKey]);

  useEffect(() => {
    localStorage.setItem(selectedCategoryKey, JSON.stringify(selectedCategoryId));
  }, [selectedCategoryId, selectedCategoryKey]);

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (idToDelete) => {
    setCategories((prev) => {
      const updated = prev.filter((c) => c.id !== idToDelete);
      if (idToDelete === selectedCategoryId) {
        setSelectedCategoryId(updated[0]?.id || null);
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Tabs: MENUS | CATEGORIES | ITEMS | MODIFIERS */}
      <MenuBuilderTabs activeTab="Categories" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <CategoryListSidebar
          categories={categories}
          setCategories={setCategories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />

        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {selectedCategory ? (
            <CategoryEditorPanel
              key={selectedCategory.id}
              selectedCategory={selectedCategory}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-lg">
              No categories yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
