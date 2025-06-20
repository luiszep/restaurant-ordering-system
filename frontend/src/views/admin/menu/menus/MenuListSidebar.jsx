import React, { useState, useMemo } from 'react';
import MenuSearchInput from '../components/listSidebarComponents/MenuSearchInput';
import MenuDraggableList from '../components/listSidebarComponents/MenuDraggableList';

const MenuListSidebar = ({
  menus,
  selectedMenuId,
  setMenus,
  setSelectedMenuId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isSearchActive = searchTerm.trim() !== '';

  const handleMenuClick = (id) => {
    setSelectedMenuId(id);
  };

  const createNewMenu = () => {
    const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newMenu = {
      id: newId,
      name: 'New Menu',
      startTime: '00:00:00',
      endTime: 'N/A',
      selectedDays: [],
      description: '',
      categories: [],
    };
    setMenus((prev) => [...prev, newMenu]);
    setSelectedMenuId(newId);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...menus];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setMenus(reordered);
  };

  const filteredMenus = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return menus.filter((m) => m.name.toLowerCase().includes(term));
  }, [menus, searchTerm]);

  return (
    <div className="w-[260px] h-full bg-white flex flex-col px-4 pt-4">
      {/* Fixed search input at the top */}
      <div className="shrink-0">
        <MenuSearchInput
          placeholder="Search menus..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Scrollable menu list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col space-y-3 pb-20">
        <MenuDraggableList
          menus={menus}
          filteredMenus={filteredMenus}
          selectedMenuId={selectedMenuId}
          handleMenuClick={handleMenuClick}
          handleDragEnd={handleDragEnd}
          isSearchActive={isSearchActive}
        />

        {/* Create Menu Button (only if not searching) */}
        {!isSearchActive && (
          <button
            onClick={createNewMenu}
            className="py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
          >
            + Create Menu
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuListSidebar;
