import React from 'react';

const CategoryList = ({ categories, filteredCategories, selectedCategoryId, handleCategoryClick, isSearchActive }) => {
  const renderList = isSearchActive ? filteredCategories : categories;

  if (isSearchActive && filteredCategories.length === 0) {
    return <p className="text-sm text-gray-400 italic">No matching categories.</p>;
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-2">
      {renderList.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`w-full px-4 py-2 text-left rounded-md border ${
            selectedCategoryId === cat.id
              ? 'bg-pink-500 text-white font-semibold'
              : 'bg-gray-100 text-gray-800 hover:bg-pink-100'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
