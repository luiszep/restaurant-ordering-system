// admin/menu/components/editorComponents/AddItemsToCategoryModal.jsx
import React, { useState, useEffect } from 'react';
import MOCK_ITEMS from '../../hooks/mockItems';

const AddItemsToCategoryModal = ({
  availableItems,
  categoryName,
  isOpen,
  onClose,
  setItems,
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    if (isOpen) setSelectedItemIds([]);
  }, [isOpen]);

  const toggleSelectItem = (id) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddSelectedItems = () => {
    const itemsToAdd = MOCK_ITEMS
      .filter((item) => selectedItemIds.includes(item.id))
      .map((item) => ({ ...item, available: true }));

    setItems((prev) => [...prev, ...itemsToAdd]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">
          Add Items to <span className="font-bold">“{categoryName}”</span> Category
        </h2>

        {/* Item List */}
        <ul className="divide-y border rounded mb-4 max-h-[300px] overflow-y-auto">
          {availableItems.map((item) => {
            const isSelected = selectedItemIds.includes(item.id);

            return (
              <li
                key={item.id}
                className="flex justify-between items-center px-4 py-3"
              >
                <div>
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                </div>

                <button
                  onClick={() => toggleSelectItem(item.id)}
                  className={`px-4 py-1 font-semibold rounded transition ${
                    isSelected
                      ? 'bg-pink-500 text-white'
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  {isSelected ? 'Added' : 'Add'}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Item Count */}
        <div className="text-sm text-gray-700 font-medium mt-1">
          You are adding <span className="font-bold">{selectedItemIds.length}</span>{' '}
          item{selectedItemIds.length !== 1 && 's'} to the{' '}
          <span className="font-bold">“{categoryName}”</span> category.
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={selectedItemIds.length === 0}
            onClick={handleAddSelectedItems}
            className={`font-semibold px-4 py-2 rounded transition ${
              selectedItemIds.length > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-green-200 text-white opacity-60 cursor-not-allowed'
            }`}
          >
            Add {selectedItemIds.length === 1 ? 'Item' : 'Items'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemsToCategoryModal;
