import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import MenuPage from './MenuPage';
import CategoryPage from './CategoryPage';
import MenuBuilderTabs from './MenuBuilderTabs';

import { useMenuState } from './hooks/useMenuState';
import { useCategoryState } from './hooks/useCategoryState';

const MenuBuilderPage = () => {
  const { id: restaurantId } = useParams();

  const {
    menus,
    setMenus,
    selectedMenuId,
    setSelectedMenuId,
    selectedMenu,
    updateMenu,
    deleteMenu,
  } = useMenuState(restaurantId);

  const {
    categories,
    setCategories,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useCategoryState(restaurantId);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId) || null;

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const deleteCategory = (idToDelete) => {
    setCategories((prev) => {
      const updated = prev.filter((cat) => cat.id !== idToDelete);
      if (selectedCategoryId === idToDelete) {
        setSelectedCategoryId(updated[0]?.id || null);
      }
      return updated;
    });

    // Remove category from all menus
    setMenus((prevMenus) =>
      prevMenus.map((menu) => ({
        ...menu,
        categories: menu.categories.filter((catId) => catId !== idToDelete),
      }))
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      {/* Fixed Tabs */}
      <div className="shrink-0 z-10 bg-white">
        <MenuBuilderTabs />
      </div>

      {/* Main Body with Sidebar and Editor */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route
            index
            element={
              <MenuPage
                menus={menus}
                setMenus={setMenus}
                selectedMenuId={selectedMenuId}
                setSelectedMenuId={setSelectedMenuId}
                selectedMenu={selectedMenu}
                updateMenu={updateMenu}
                deleteMenu={deleteMenu}
                categories={categories}
              />
            }
          />
          <Route
            path="categories"
            element={
              <CategoryPage
                categories={categories}
                setCategories={setCategories}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                selectedCategory={selectedCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
                menus={menus}
                setMenus={setMenus}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MenuBuilderPage;
