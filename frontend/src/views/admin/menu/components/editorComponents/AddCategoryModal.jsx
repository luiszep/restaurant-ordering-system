import React from 'react';

const AddCategoryModal = ({
  categories,
  handleAddSelectedCategories,
  menuCategoryIds,
  selectedCategoryIds,
  setSelectedCategoryIds,
  setShowCategoryModal,
}) => {
  const isDisabled = selectedCategoryIds.length === 0;

  // Handle checkbox toggle
  const handleToggle = (id, checked) => {
    setSelectedCategoryIds((prev) =>
      checked ? [...prev, id] : prev.filter((existingId) => existingId !== id)
    );
  };

  // Filter categories not yet in the menu
  const availableCategories = categories.filter(
    (cat) => !menuCategoryIds.includes(cat.id)
  );

  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-4">Select Categories to Add</h3>

        {/* Category List */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableCategories.map((cat) => (
            <label
              key={cat.id}
              htmlFor={`cat-${cat.id}`}
              className="flex items-center gap-2"
            >
              <input
                id={`cat-${cat.id}`}
                type="checkbox"
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={(e) => handleToggle(cat.id, e.target.checked)}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setShowCategoryModal(false);
              setSelectedCategoryIds([]);
            }}
            className="text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            onClick={handleAddSelectedCategories}
            className={`text-sm px-4 py-2 rounded ${
              isDisabled
                ? 'bg-green-100 text-green-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
