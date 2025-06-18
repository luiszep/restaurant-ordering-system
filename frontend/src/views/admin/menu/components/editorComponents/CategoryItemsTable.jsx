import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import AddItemsToCategoryModal from './AddItemsToCategoryModal';
import MOCK_ITEMS from '../../hooks/mockItems';

const CategoryItemsTable = ({ categoryName, items, setItems }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const availableItems = MOCK_ITEMS.filter(
    (item) => !items.some((existing) => existing.id === item.id)
  );
  const hasAvailableItems = availableItems.length > 0;


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
  };

  const handleToggleAvailability = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setItems(updated);
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Items in “{categoryName}” Category</h2>
        {hasAvailableItems && (
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded hover:bg-green-200 transition"
          >
            + Add Item
          </button>
        )}
        <AddItemsToCategoryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          categoryName={categoryName}
          availableItems={availableItems}
          setItems={setItems}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="item-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={`item-${item.id}`} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between border-t px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <span {...provided.dragHandleProps} className="cursor-move text-lg">≡</span>
                        <div className="text-sm">
                          <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                            {item.name}
                          </span>
                          <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={!!item.available}
                          onChange={() => handleToggleAvailability(item.id)}
                        />
                          Available
                        </label>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div> 
  );
};

export default CategoryItemsTable;
