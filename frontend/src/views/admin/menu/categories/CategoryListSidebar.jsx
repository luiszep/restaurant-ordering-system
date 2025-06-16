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
    const newId = Date.now();
    const newCategory = {
      id: Date.now(),
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
    <div className="w-[260px] bg-white border-r border-gray-200 flex flex-col p-4">
      {/* This fills the vertical space above the button */}
      <div className="flex-1 flex flex-col">
        <MenuSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search categories..."
        />
        
        <CategoryList
          categories={categories}
          filteredCategories={filteredCategories}
          selectedCategoryId={selectedCategoryId}
          handleCategoryClick={handleCategoryClick}
          isSearchActive={isSearchActive}
        />
      </div>

      {/* Button always pinned to bottom */}
      <button
        onClick={handleCreateCategory}
        className="mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
      >
        + Create Category
      </button>
    </div>
  );
};

export default CategoryListSidebar;
