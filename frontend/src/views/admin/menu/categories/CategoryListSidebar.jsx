import React, { useState, useMemo } from 'react';
import MenuSearchInput from '../components/listSidebarComponents/MenuSearchInput';
import CategoryList from '../components/listSidebarComponents/CategoryList';

const CategoryListSidebar = ({
  categories,
  setCategories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (id) => setSelectedCategoryId(id);

  const handleCreateCategory = () => {
    const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newCategory = {
      id: newId,
      name: 'New Category',
      description: '',
      autoExpand: false,
      items: [],
    };
    setCategories((prev) => [...prev, newCategory]);
    setSelectedCategoryId(newId);
  };

  const filteredCategories = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(term));
  }, [categories, searchTerm]);

  const isSearchActive = searchTerm.trim() !== '';

  return (
    <div className="w-[260px] h-full bg-white flex flex-col px-4 pt-4">
      {/* Fixed search input (not scrollable) */}
      <div className="shrink-0">
        <MenuSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search categories..."
        />
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col space-y-3 pb-20">
        <CategoryList
          categories={categories}
          filteredCategories={filteredCategories}
          selectedCategoryId={selectedCategoryId}
          handleCategoryClick={handleCategoryClick}
          isSearchActive={isSearchActive}
        />

        {!isSearchActive && (
          <button
            onClick={handleCreateCategory}
            className="py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
          >
            + Create Category
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryListSidebar;
