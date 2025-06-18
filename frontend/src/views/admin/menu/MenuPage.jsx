import React, { useMemo } from 'react';
import MenuListSidebar from './menus/MenuListSidebar';
import MenuEditorPanel from './menus/MenuEditorPanel';

const MenuPage = ({
  menus = [],
  setMenus,
  selectedMenuId,
  setSelectedMenuId,
  selectedMenu,
  updateMenu,
  deleteMenu,
  categories = [],
}) => {
  const currentMenu = useMemo(() => {
    return selectedMenu || menus.find((menu) => menu.id === selectedMenuId) || null;
  }, [menus, selectedMenuId, selectedMenu]);

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden">
      <div className="w-64 shrink-0 bg-white">
        <MenuListSidebar
          menus={menus}
          setMenus={setMenus}
          selectedMenuId={selectedMenuId}
          setSelectedMenuId={setSelectedMenuId}
        />
      </div>

      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto scrollbar-hide">
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
  );
};

export default MenuPage;
