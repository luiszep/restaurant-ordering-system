import { useState, useEffect } from 'react';
import { getMenusKey, getSelectedMenuKey } from './localStorageHelpers';

// Sample default menus (used on first load if none are stored)
const defaultMenus = [
  {
    id: 1,
    name: 'All Day Menu 🥪',
    startTime: '00:00:00',
    endTime: 'N/A',
    selectedDays: [],
    description: '',
    categories: ['cat-1', 'cat-2'],
  },
  {
    id: 2,
    name: 'Breakfast Menu 😊',
    startTime: '07:00:00',
    endTime: '11:00:00',
    selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    description: 'Morning specials to start your day.',
    categories: [],
  },
  {
    id: 3,
    name: 'Beverages ☕',
    startTime: '00:00:00',
    endTime: 'N/A',
    selectedDays: [],
    description: '',
    categories: [],
  },
  {
    id: 4,
    name: 'Desserts 🍪',
    startTime: '00:00:00',
    endTime: 'N/A',
    selectedDays: [],
    description: '',
    categories: [],
  },
  {
    id: 5,
    name: 'Grab N’ Go 🥤',
    startTime: '10:00:00',
    endTime: '14:00:00',
    selectedDays: ['Sat', 'Sun'],
    description: '',
    categories: [],
  },
];

export const useMenuState = (restaurantId) => {
  const menusKey = getMenusKey(restaurantId);
  const selectedMenuKey = getSelectedMenuKey(restaurantId);

  // Initialize menus (lazy-load from localStorage or fallback to defaults)
  const [menus, setMenus] = useState(() => {
    const stored = localStorage.getItem(menusKey);
    return stored ? JSON.parse(stored) : [...defaultMenus];
  });

  // Initialize selected menu ID
  const [selectedMenuId, setSelectedMenuId] = useState(() => {
    const stored = localStorage.getItem(selectedMenuKey);
    return stored ? JSON.parse(stored) : menus[0]?.id || null;
  });

  // Compute selected menu object
  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId) || null;

  // Persist menus on change
  useEffect(() => {
    localStorage.setItem(menusKey, JSON.stringify(menus));
  }, [menus, menusKey]);

  // Persist selected menu ID on change
  useEffect(() => {
    localStorage.setItem(selectedMenuKey, JSON.stringify(selectedMenuId));
  }, [selectedMenuId, selectedMenuKey]);

  // Update a menu by ID
  const updateMenu = (id, updates) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.id === id ? { ...menu, ...updates } : menu))
    );
  };

  // Delete a menu by ID
  const deleteMenu = (idToDelete) => {
    setMenus((prev) => {
      const updated = prev.filter((menu) => menu.id !== idToDelete);
      if (idToDelete === selectedMenuId) {
        setSelectedMenuId(updated[0]?.id || null);
      }
      return updated;
    });
  };

  return {
    deleteMenu,
    menus,
    selectedMenu,
    selectedMenuId,
    setMenus,
    setSelectedMenuId,
    updateMenu,
  };
};
