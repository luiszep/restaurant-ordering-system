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
    <div className="flex flex-col h-full w-full bg-white">
      <MenuBuilderTabs />

      <div className="flex-1 overflow-hidden">
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
            />
          }
        />
      </Routes>

      </div>
    </div>
  );
};

export default MenuBuilderPage;
