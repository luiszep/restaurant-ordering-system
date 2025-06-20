import { useState, useEffect } from 'react';
import { getCategoriesKey, getSelectedCategoryKey } from './localStorageHelpers';

export const useCategoryState = (restaurantId) => {
  const categoriesKey = getCategoriesKey(restaurantId);
  const selectedCategoryKey = getSelectedCategoryKey(restaurantId);

  // Load categories from localStorage or use empty array
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(categoriesKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Load selected category ID or default to null
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const saved = localStorage.getItem(selectedCategoryKey);
    return saved ? JSON.parse(saved) : null;
  });

  // Sync categories to localStorage when changed
  useEffect(() => {
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
  }, [categories, categoriesKey]);

  // Sync selectedCategoryId to localStorage when changed
  useEffect(() => {
    localStorage.setItem(selectedCategoryKey, JSON.stringify(selectedCategoryId));
  }, [selectedCategoryId, selectedCategoryKey]);

  return {
    categories,
    selectedCategoryId,
    setCategories,
    setSelectedCategoryId,
  };
};
