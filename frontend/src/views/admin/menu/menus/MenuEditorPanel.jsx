import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Util: generate time options in 15-min increments
const timeOptions = Array.from({ length: 96 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, '0');
  const minutes = String((i % 4) * 15).padStart(2, '0');
  return `${hours}:${minutes}:00`;
});

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MenuEditorPanel = ({ selectedMenu, updateMenu, deleteMenu, categories }) => {
  // ----- State -----
  const [isEditingName, setIsEditingName] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('N/A');
  const [timeError, setTimeError] = useState('');
  const [description, setDescription] = useState('');
  const [menuCategoryIds, setMenuCategoryIds] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // ----- Effects -----
  useEffect(() => {
    if (!selectedMenu) return;

    setMenuName(selectedMenu.name || '');
    setSelectedDays(selectedMenu.selectedDays || []);
    setStartTime(selectedMenu.startTime || '00:00:00');
    setEndTime(selectedMenu.endTime || 'N/A');
    setDescription(selectedMenu.description || '');
    const validIds = (selectedMenu.categories || []).filter(id =>
      categories.some(c => c.id === id)
    );
    setMenuCategoryIds(validIds);
  }, [selectedMenu, categories]);

  // ----- Handlers -----
  const toggleDay = (day) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    updateMenu?.(selectedMenu.id, { selectedDays: updated });
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    updateMenu?.(selectedMenu.id, { startTime: value });
    if (endTime !== 'N/A' && value >= endTime) {
      setTimeError('End time must be later than start time.');
    } else {
      setTimeError('');
    }
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    updateMenu?.(selectedMenu.id, { endTime: value });
    if (value !== 'N/A' && startTime >= value) {
      setTimeError('End time must be later than start time.');
    } else {
      setTimeError('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...menuCategoryIds];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setMenuCategoryIds(reordered);
    updateMenu?.(selectedMenu.id, { categories: reordered });
  };

  const handleDeleteCategory = (id) => {
    const updated = menuCategoryIds.filter((catId) => catId !== id);
    setMenuCategoryIds(updated);
    updateMenu?.(selectedMenu.id, { categories: updated });
  };

  const handleAddSelectedCategories = () => {
    const updated = Array.from(new Set([...menuCategoryIds, ...selectedCategoryIds]));
    setMenuCategoryIds(updated);
    updateMenu?.(selectedMenu.id, { categories: updated });
    setShowCategoryModal(false);
    setSelectedCategoryIds([]);
  };

  // ----- Render -----
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title Section */}
      <div className="mb-4 pl-2">
        {isEditingName ? (
          <input
            className="text-3xl font-bold text-gray-800 bg-transparent border-none px-1 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            onBlur={() => {
              setIsEditingName(false);
              updateMenu?.(selectedMenu.id, { name: menuName });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditingName(false);
                updateMenu?.(selectedMenu.id, { name: menuName });
              }
            }}
            autoFocus
          />
        ) : (
          <h1
            className="text-3xl font-bold text-gray-800 cursor-pointer hover:underline"
            onClick={() => setIsEditingName(true)}
          >
            {menuName}
          </h1>
        )}
      </div>

      {/* Settings Panel */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Menu Settings</h2>

        <div className="flex gap-2 mb-3">
          {WEEKDAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`font-medium px-3 py-1 rounded transition ${
                selectedDays.includes(day)
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mb-3">
          {/* Start Time */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start Time</label>
            <select
              id="start-time"
              aria-label="Start Time"
              value={startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              className={`border ${timeError ? 'border-red-500' : 'border-gray-300'} rounded px-2 py-1 text-sm`}
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* End Time */}
          <div className="flex items-end gap-2">
            <div>
              <label className="block text-sm text-gray-700 mb-1">End Time</label>
              <select
                id="end-time"
                aria-label="End Time"
                value={endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className={`border ${timeError ? 'border-red-500' : 'border-gray-300'} rounded px-2 py-1 text-sm`}
              >
                <option value="N/A">N/A</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            {timeError && (
              <span className="text-red-600 text-sm whitespace-nowrap">{timeError}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <label className="block text-sm text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 500) {
              setDescription(value);
              updateMenu?.(selectedMenu.id, { description: value });
            }
          }}
          placeholder="Optional description..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className={`text-right text-xs mt-1 ${description.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
          {description.length} / 500
        </div>
      </div>

      {/* Categories Table */}
      {/* Categories Section */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">
            Categories in {menuName || 'Unnamed'} Menu
          </h2>
          {menuCategoryIds.length < categories.length && (
            <button
              onClick={() => setShowCategoryModal(true)}
              className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded hover:bg-green-200 transition"
            >
              + Add Category
            </button>
          )}
        </div>

        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="grid grid-cols-[140px_1fr_140px_100px] bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-2">
            <div>Category Position</div>
            <div>Name</div>
            <div>Number of Items</div>
            <div>Actions</div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="category-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {menuCategoryIds.map((catId, index) => {
                    const cat = categories.find((c) => c.id === catId);
                    if (!cat) {
                      console.warn(`Category ID "${catId}" not found in global categories list.`);
                      return null;
                    }

                    const itemCount = Array.isArray(cat.items)
                      ? cat.items.length
                      : 0;

                    return (
                      <Draggable key={String(cat.id)} draggableId={String(cat.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="grid grid-cols-[140px_1fr_140px_100px] items-center text-sm text-gray-700 border-t px-4 py-2 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-2">
                              <span {...provided.dragHandleProps} className="cursor-move text-lg">≡</span>
                              <span className="text-gray-500">#{index + 1}</span>
                            </div>
                            <div className="text-blue-600">{typeof cat.name === 'string' ? cat.name : 'Unnamed'}</div>
                            <div>{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
                            <div>
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {showCategoryModal && (
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
                      setSelectedCategoryIds((prev) => prev.filter((id) => id !== cat.id));
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
                setSelectedCategoryIds([]); // reset on cancel
              }}
              className="text-sm px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              disabled={categories.length === 0 || menuCategoryIds.length === categories.length}
              className={`text-sm px-4 py-2 rounded ${
                selectedCategoryIds.length === 0
                  ? 'bg-green-100 text-green-400 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
              onClick={handleAddSelectedCategories}
            >
              Add Selected
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Delete Button */}
      <div className="mt-6 text-right">
        <button
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete the "${selectedMenu.name}" menu? This cannot be undone.`)
            ) {
              deleteMenu?.(selectedMenu.id);
            }
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
        >
          Delete Menu 🗑️
        </button>
      </div>
    </div>
  );
};

export default MenuEditorPanel;
