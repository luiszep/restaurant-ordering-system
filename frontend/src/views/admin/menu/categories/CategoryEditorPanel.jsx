import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const DEFAULT_ITEMS = [
  { id: 'item-1', name: 'Ham Sandwich 🥪', price: 5.99, available: true },
  { id: 'item-2', name: 'Turkey Club 🥪', price: 6.49, available: true },
  { id: 'item-3', name: 'BLT 🥓', price: 5.29, available: false },
];

const CategoryEditorPanel = ({ selectedCategory, updateCategory, deleteCategory }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [autoExpand, setAutoExpand] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!selectedCategory) return;

    setName(selectedCategory.name || '');
    setDescription(selectedCategory.description || '');
    setAutoExpand(selectedCategory.autoExpand || false);
    setItems(selectedCategory.items || []);
  }, [selectedCategory]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    updateCategory?.(selectedCategory.id, { items: reordered });
  };

  const handleToggleAvailability = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setItems(updated);
    updateCategory?.(selectedCategory.id, { items: updated });
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    updateCategory?.(selectedCategory.id, { items: updated });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Editable Title */}
      <div className="mb-4 pl-2">
        {isEditingName ? (
          <input
            className="text-3xl font-bold text-gray-800 bg-transparent border-none px-1 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              setIsEditingName(false);
              updateCategory?.(selectedCategory.id, { name });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditingName(false);
                updateCategory?.(selectedCategory.id, { name });
              }
            }}
            autoFocus
          />
        ) : (
          <h1
            className="text-3xl font-bold text-gray-800 cursor-pointer hover:underline"
            onClick={() => setIsEditingName(true)}
          >
            {name}
          </h1>
        )}
      </div>

      {/* 1. Category Settings */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Category Settings</h2>

        <div className="mb-4">
          <label className="text-sm text-gray-700 mr-3">
            <input
              type="checkbox"
              checked={autoExpand}
              onChange={(e) => {
                setAutoExpand(e.target.checked);
                updateCategory?.(selectedCategory.id, { autoExpand: e.target.checked });
              }}
              className="mr-2"
            />
            Expand Category on Load
          </label>
        </div>

        <label className="block text-sm text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 500) {
              setDescription(value);
              updateCategory?.(selectedCategory.id, { description: value });
            }
          }}
          placeholder="Optional description..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className={`text-right text-xs mt-1 ${description.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
          {description.length} / 500
        </div>
      </div>

      {/* 2. Menus using this Category */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Menus with “{name}” Category</h2>
        {/* Replace this with dynamic menu list later */}
        <p className="text-sm text-gray-600">This category appears in: All Day Menu</p>
      </div>

      {/* 3. Items in this Category */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Items in “{name}” Category</h2>
          <button className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded hover:bg-green-200 transition">
            + Add Item
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="item-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center justify-between border-t px-4 py-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <span {...provided.dragHandleProps} className="cursor-move text-lg">≡</span>
                          <div className="text-sm">
                            <div className="font-medium text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1 text-sm text-gray-600">
                            <input
                              type="checkbox"
                              checked={item.available}
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

      {/* Delete Button */}
      <div className="mt-6 text-right">
        <button
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete the "${name}" category? This cannot be undone.`)
            ) {
              deleteCategory?.(selectedCategory.id);
            }
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
        >
          Delete Category 🗑️
        </button>
      </div>
    </div>
  );
};

export default CategoryEditorPanel;
