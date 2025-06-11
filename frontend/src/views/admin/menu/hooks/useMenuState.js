import { useState, useEffect } from 'react';
import { getMenusKey, getSelectedMenuKey } from './localStorageHelpers';

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

  const [menus, setMenus] = useState(() => {
    const stored = localStorage.getItem(menusKey);
    return stored ? JSON.parse(stored) : [...defaultMenus];
  });

  const [selectedMenuId, setSelectedMenuId] = useState(() => {
    const stored = localStorage.getItem(selectedMenuKey);
    return stored ? JSON.parse(stored) : menus[0]?.id || null;
  });

  const selectedMenu = menus.find((m) => m.id === selectedMenuId) || null;

  useEffect(() => {
    localStorage.setItem(menusKey, JSON.stringify(menus));
  }, [menus, menusKey]);

  useEffect(() => {
    localStorage.setItem(selectedMenuKey, JSON.stringify(selectedMenuId));
  }, [selectedMenuId, selectedMenuKey]);

  const updateMenu = (id, updates) => {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteMenu = (id) => {
    setMenus((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      if (id === selectedMenuId) {
        setSelectedMenuId(updated[0]?.id || null);
      }
      return updated;
    });
  };

  return {
    menus,
    setMenus,
    selectedMenuId,
    setSelectedMenuId,
    selectedMenu,
    updateMenu,
    deleteMenu,
  };
};
