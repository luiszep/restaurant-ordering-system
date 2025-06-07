import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MenuListSidebar from './MenuListSidebar';
import MenuEditorPanel from './MenuEditorPanel';
import MenuBuilderTabs from './MenuBuilderTabs';

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

const MenuPage = () => {
  const { id: restaurantId } = useParams();
  
  const menusKey = `menus-${restaurantId}`;
  const selectedMenuKey = `selectedMenuId-${restaurantId}`;
  
  const [menus, setMenus] = useState(() => {
    const stored = localStorage.getItem(menusKey);
    return stored ? JSON.parse(stored) : [...defaultMenus];
  });

  const [selectedMenuId, setSelectedMenuId] = useState(() => {
    const stored = localStorage.getItem(selectedMenuKey);
    return stored ? JSON.parse(stored) : 1;
  });

  const selectedMenu = useMemo(
    () => menus.find((menu) => menu.id === selectedMenuId),
    [menus, selectedMenuId]
  );

  useEffect(() => {
    localStorage.setItem(menusKey, JSON.stringify(menus));
  }, [menus, menusKey]);

  useEffect(() => {
    localStorage.setItem(selectedMenuKey, JSON.stringify(selectedMenuId));
  }, [selectedMenuId, selectedMenuKey]);

  const updateMenu = (id, updates) => {
    setMenus((prev) =>
      prev.map((menu) => (menu.id === id ? { ...menu, ...updates } : menu))
    );
  };

  const deleteMenu = (idToDelete) => {
    setMenus((prev) => {
      const updated = prev.filter((m) => m.id !== idToDelete);
      if (idToDelete === selectedMenuId) {
        setSelectedMenuId(updated[0]?.id || null);
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Tabs: MENUS | CATEGORIES | ITEMS | MODIFIERS */}
      <MenuBuilderTabs activeTab="Menus" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <MenuListSidebar
          menus={menus}
          setMenus={setMenus}
          selectedMenuId={selectedMenuId}
          setSelectedMenuId={setSelectedMenuId}
        />

        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {selectedMenu ? (
            <MenuEditorPanel
              key={selectedMenu.id}
              selectedMenu={selectedMenu}
              updateMenu={updateMenu}
              deleteMenu={deleteMenu}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-lg">
              No menus yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
