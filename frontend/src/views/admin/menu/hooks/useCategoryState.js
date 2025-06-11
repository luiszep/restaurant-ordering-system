import { useState, useEffect } from 'react';
import { getCategoriesKey, getSelectedCategoryKey } from './localStorageHelpers';

export const useCategoryState = (restaurantId) => {
  const categoriesKey = getCategoriesKey(restaurantId);
  const selectedCategoryKey = getSelectedCategoryKey(restaurantId);

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem(categoriesKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const stored = localStorage.getItem(selectedCategoryKey);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
  }, [categories, categoriesKey]);

  useEffect(() => {
    localStorage.setItem(selectedCategoryKey, JSON.stringify(selectedCategoryId));
  }, [selectedCategoryId, selectedCategoryKey]);

  return {
    categories,
    setCategories,
    selectedCategoryId,
    setSelectedCategoryId,
  };
};
