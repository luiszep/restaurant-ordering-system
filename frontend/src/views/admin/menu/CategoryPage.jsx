import React, { useEffect, useMemo } from 'react';
import CategoryListSidebar from './categories/CategoryListSidebar';
import CategoryEditorPanel from './categories/CategoryEditorPanel';

const CategoryPage = ({
  categories = [],
  deleteCategory,
  menus,
  selectedCategory,
  selectedCategoryId,
  setCategories,
  setMenus,
  setSelectedCategoryId,
  updateCategory,
}) => {
  // 🧭 Handle deep-linking via jumpToCategoryId (set by MENUS tab)
  useEffect(() => {
    const jumpToId = localStorage.getItem('jumpToCategoryId');

    const isValidId =
      jumpToId && categories.some((cat) => String(cat.id) === String(jumpToId));

    if (jumpToId && categories.length > 0 && isValidId) {
      setSelectedCategoryId(jumpToId);
      localStorage.removeItem('jumpToCategoryId');
    }

    // Only re-run when the number of categories changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // 🧠 Get the currently selected category (either from ID or prop)
  const currentCategory = useMemo(() => {
    return (
      selectedCategory ||
      categories.find((cat) => cat.id === selectedCategoryId) ||
      null
    );
  }, [categories, selectedCategory, selectedCategoryId]);

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden">
      {/* Sidebar — Category list */}
      <div className="w-64 shrink-0 bg-white">
        <CategoryListSidebar
          categories={categories}
          setCategories={setCategories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>

      {/* Editor Panel — Only shown if a category is selected */}
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
