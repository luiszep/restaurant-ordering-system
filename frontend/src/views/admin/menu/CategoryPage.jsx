import React, { useMemo, useEffect } from 'react';
import CategoryListSidebar from './categories/CategoryListSidebar';
import CategoryEditorPanel from './categories/CategoryEditorPanel';

const CategoryPage = ({
  categories = [],
  setCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedCategory,
  updateCategory,
  deleteCategory,
  menus,
  setMenus,
}) => {
  // Handle category jump on tab switch (e.g. from MENUS tab link)
  useEffect(() => {
    const jumpToId = localStorage.getItem('jumpToCategoryId');

    const isValidId =
      jumpToId && categories.some((cat) => String(cat.id) === String(jumpToId));

    if (jumpToId && categories.length > 0 && isValidId) {
      setSelectedCategoryId(jumpToId);
      localStorage.removeItem('jumpToCategoryId');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]); // ✅ Only track length; avoids unstable reference

  // Select current category or fall back to first
  const currentCategory = useMemo(() => {
    return (
      selectedCategory ||
      categories.find((cat) => cat.id === selectedCategoryId) ||
      null
    );
  }, [categories, selectedCategoryId, selectedCategory]);

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden">
      {/* Sidebar with List of Categories */}
      <div className="w-64 shrink-0 bg-white">
        <CategoryListSidebar
          categories={categories}
          setCategories={setCategories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>

      {/* Main Editor Panel */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto scrollbar-hide">
        {currentCategory ? (
          <CategoryEditorPanel
            key={currentCategory.id}
            selectedCategory={currentCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            menus={menus}
            setMenus={setMenus}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-lg">
            No categories yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
