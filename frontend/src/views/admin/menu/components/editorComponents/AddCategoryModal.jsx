import React from 'react';

const AddCategoryModal = ({
  categories,
  menuCategoryIds,
  selectedCategoryIds,
  setSelectedCategoryIds,
  setShowCategoryModal,
  handleAddSelectedCategories,
}) => {
  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Select Categories to Add</h3>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories
            .filter((cat) => !menuCategoryIds.includes(cat.id))
            .map((cat) => (
              <label key={cat.id} htmlFor={`cat-${cat.id}`} className="flex items-center gap-2">
                <input
                  id={`cat-${cat.id}`}
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategoryIds((prev) => [...prev, cat.id]);
                    } else {
                      setSelectedCategoryIds((prev) =>
                        prev.filter((id) => id !== cat.id)
                      );
                    }
                  }}
                />
                <span>{cat.name}</span>
              </label>
            ))}
        </div>

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
            disabled={selectedCategoryIds.length === 0}
            onClick={handleAddSelectedCategories}
            className={`text-sm px-4 py-2 rounded ${
              selectedCategoryIds.length === 0
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