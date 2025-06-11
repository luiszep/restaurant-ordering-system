import React, { useState, useEffect } from 'react';

import EditableTitle from '../components/editorComponents/EditableTitle';
import MenuSettingsPanel from '../components/editorComponents/MenuSettingsPanel';
import MenuCategoriesTable from '../components/editorComponents/MenuCategoriesTable';
import AddCategoryModal from '../components/editorComponents/AddCategoryModal';
import DeleteButton from '../components/editorComponents/DeleteButton';

const MenuEditorPanel = ({ selectedMenu, updateMenu, deleteMenu, categories }) => {
  // -------------------- State --------------------
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

  // -------------------- Effects --------------------
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

  // -------------------- Handlers --------------------
  const toggleDay = (day) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updated);
    updateMenu(selectedMenu.id, { selectedDays: updated });
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    updateMenu(selectedMenu.id, { startTime: value });

    if (endTime !== 'N/A' && value >= endTime) {
      setTimeError('End time must be later than start time.');
    } else {
      setTimeError('');
    }
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    updateMenu(selectedMenu.id, { endTime: value });

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
    updateMenu(selectedMenu.id, { categories: reordered });
  };

  const handleDeleteCategory = (id) => {
    const updated = menuCategoryIds.filter(catId => catId !== id);
    setMenuCategoryIds(updated);
    updateMenu(selectedMenu.id, { categories: updated });
  };

  const handleAddSelectedCategories = () => {
    const updated = Array.from(new Set([...menuCategoryIds, ...selectedCategoryIds]));
    setMenuCategoryIds(updated);
    updateMenu(selectedMenu.id, { categories: updated });

    setShowCategoryModal(false);
    setSelectedCategoryIds([]);
  };

  // -------------------- Render --------------------
  return (
    <div className="w-full max-w-5xl mx-auto">
      <EditableTitle
        isEditing={isEditingName}
        setIsEditing={setIsEditingName}
        title={menuName}
        setTitle={setMenuName}
        onSave={(newName) => updateMenu(selectedMenu.id, { name: newName })}
      />

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

      <MenuCategoriesTable
        menuName={menuName}
        menuCategoryIds={menuCategoryIds}
        categories={categories}
        handleDragEnd={handleDragEnd}
        handleDeleteCategory={handleDeleteCategory}
        onAddCategoryClick={() => setShowCategoryModal(true)}
      />

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

      <DeleteButton
        label="Delete Menu 🗑️"
        confirmMessage={`Are you sure you want to delete the "${selectedMenu.name}" menu? This cannot be undone.`}
        onConfirm={() => deleteMenu(selectedMenu.id)}
      />
    </div>
  );
};

export default MenuEditorPanel;