import React, { useMemo } from 'react';
import CategoryListSidebar from './categories/CategoryListSidebar';
import CategoryEditorPanel from './categories/CategoryEditorPanel';

const CategoryPage = ({
  categories = [], // Default categories to an empty array if not provided
  setCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedCategory,
  updateCategory,
  deleteCategory,
}) => {
  // Ensure selectedCategory is properly set (use the first category as a fallback if none is selected)
  const currentCategory = useMemo(() => {
    return selectedCategory || categories.find((cat) => cat.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId, selectedCategory]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Layout for Sidebar and Category Editor Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with List of Categories */}
        <CategoryListSidebar
          categories={categories}
          setCategories={setCategories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />

        {/* Category Editor Panel */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {currentCategory ? (
            <CategoryEditorPanel
              key={currentCategory.id}
              selectedCategory={currentCategory}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-lg">
              No categories yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
