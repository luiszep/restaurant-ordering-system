import React, { useState, useMemo } from 'react';

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
      id: newId,
      name: 'New Category',
      description: '',
      expandByDefault: false,
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
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-500 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>

      {/* Category List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {isSearchActive ? (
          filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
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
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">No matching categories.</p>
          )
        ) : (
          categories.map((cat) => (
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
          ))
        )}
      </div>

      {/* Create Category Button */}
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
