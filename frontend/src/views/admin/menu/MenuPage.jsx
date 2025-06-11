import React, { useMemo } from 'react';
import MenuListSidebar from './menus/MenuListSidebar';
import MenuEditorPanel from './menus/MenuEditorPanel';

const MenuPage = ({
  menus = [],  // Default to an empty array if no menus are provided
  setMenus,
  selectedMenuId,
  setSelectedMenuId,
  selectedMenu,
  updateMenu,
  deleteMenu,
  categories = [],  // Default to an empty array if no categories are provided
}) => {
  // Ensure selectedMenu is properly set (use the first menu as a fallback if none is selected)
  const currentMenu = useMemo(() => {
    return selectedMenu || menus.find((menu) => menu.id === selectedMenuId) || null;
  }, [menus, selectedMenuId, selectedMenu]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Ensure the layout is properly structured with Sidebar and Editor Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menu Sidebar */}
        <MenuListSidebar
          menus={menus}
          setMenus={setMenus}
          selectedMenuId={selectedMenuId}
          setSelectedMenuId={setSelectedMenuId}
        />
        
        {/* Menu Editor Panel */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {currentMenu ? (
            <MenuEditorPanel
              key={currentMenu.id}
              selectedMenu={currentMenu}
              updateMenu={updateMenu}
              deleteMenu={deleteMenu}
              categories={categories}
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
