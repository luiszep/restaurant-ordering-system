import React, { useState, useEffect } from 'react';

import EditableTitle from '../components/editorComponents/EditableTitle';
import MenuSettingsPanel from '../components/editorComponents/MenuSettingsPanel';
import MenuCategoriesTable from '../components/editorComponents/MenuCategoriesTable';
import AddCategoryModal from '../components/editorComponents/AddCategoryModal';
import DeleteButton from '../components/editorComponents/DeleteButton';

const MenuEditorPanel = ({ selectedMenu, updateMenu, deleteMenu, categories }) => {
  const menuId = selectedMenu.id;

  // Name and schedule
  const [menuName, setMenuName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('N/A');
  const [timeError, setTimeError] = useState('');

  // Description
  const [description, setDescription] = useState('');

  // Category handling
  const [menuCategoryIds, setMenuCategoryIds] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // Sync selected menu into local state
  useEffect(() => {
    if (!selectedMenu) return;

    setMenuName(selectedMenu.name || '');
    setSelectedDays(selectedMenu.selectedDays || []);
    setStartTime(selectedMenu.startTime || '00:00:00');
    setEndTime(selectedMenu.endTime || 'N/A');
    setDescription(selectedMenu.description || '');

    const validIds = (selectedMenu.categories || []).filter((id) =>
      categories.some((c) => c.id === id)
    );
    setMenuCategoryIds(validIds);
  }, [selectedMenu, categories]);

  // Day toggling
  const toggleDay = (day) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    updateMenu(menuId, { selectedDays: updated });
  };

  // Time handling
  const handleStartTimeChange = (value) => {
    setStartTime(value);
    updateMenu(menuId, { startTime: value });

    if (endTime !== 'N/A' && value >= endTime) {
      setTimeError('End time must be later than start time.');
    } else {
      setTimeError('');
    }
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    updateMenu(menuId, { endTime: value });

    if (value !== 'N/A' && startTime >= value) {
      setTimeError('End time must be later than start time.');
    } else {
      setTimeError('');
    }
  };

  // Drag & drop categories
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...menuCategoryIds];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setMenuCategoryIds(reordered);
    updateMenu(menuId, { categories: reordered });
  };

  const handleDeleteCategory = (id) => {
    const updated = menuCategoryIds.filter((catId) => catId !== id);
    setMenuCategoryIds(updated);
    updateMenu(menuId, { categories: updated });
  };

  const handleAddSelectedCategories = () => {
    const updated = Array.from(new Set([...menuCategoryIds, ...selectedCategoryIds]));
    setMenuCategoryIds(updated);
    updateMenu(menuId, { categories: updated });

    setShowCategoryModal(false);
    setSelectedCategoryIds([]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide px-4 pt-4 pb-20">
        <div className="w-full max-w-5xl mx-auto">
          {/* Editable Menu Title */}
          <EditableTitle
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            title={menuName}
            setTitle={setMenuName}
            onSave={(newName) => updateMenu(menuId, { name: newName })}
          />

          {/* Scheduling and Description */}
          <MenuSettingsPanel
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            startTime={startTime}
            endTime={endTime}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
            timeError={timeError}
            description={description}
            setDescription={setDescription}
            selectedMenu={selectedMenu}
            updateMenu={updateMenu}
          />

          {/* Category Table */}
          <MenuCategoriesTable
            menuName={menuName}
            menuCategoryIds={menuCategoryIds}
            categories={categories}
            handleDragEnd={handleDragEnd}
            handleDeleteCategory={handleDeleteCategory}
            onAddCategoryClick={() => setShowCategoryModal(true)}
          />

          {/* Add Category Modal */}
          {showCategoryModal && (
            <AddCategoryModal
              categories={categories}
              menuCategoryIds={menuCategoryIds}
              selectedCategoryIds={selectedCategoryIds}
              setSelectedCategoryIds={setSelectedCategoryIds}
              setShowCategoryModal={setShowCategoryModal}
              handleAddSelectedCategories={handleAddSelectedCategories}
            />
          )}

          {/* Delete Menu Button */}
          <div className="mt-8">
            <DeleteButton
              label="Delete Menu 🗑️"
              confirmMessage={`Are you sure you want to delete the "${selectedMenu.name}" menu? This cannot be undone.`}
              onConfirm={() => deleteMenu(menuId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuEditorPanel;
