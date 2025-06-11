import React, { useState, useEffect } from 'react';

import EditableTitle from '../components/editorComponents/EditableTitle';
import DeleteButton from '../components/editorComponents/DeleteButton';
import CategorySettingsPanel from '../components/editorComponents/CategorySettingsPanel';
import CategoryItemsTable from '../components/editorComponents/CategoryItemsTable';

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

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Editable Category Title */}
      <EditableTitle
        isEditing={isEditingName}
        setIsEditing={setIsEditingName}
        title={name}
        setTitle={setName}
        onSave={(newName) => updateCategory?.(selectedCategory.id, { name: newName })}
      />

      {/* Category Settings: Description + Expand Toggle */}
      <CategorySettingsPanel
        autoExpand={autoExpand}
        setAutoExpand={setAutoExpand}
        description={description}
        setDescription={setDescription}
        onUpdate={(changes) => updateCategory?.(selectedCategory.id, changes)}
      />

      {/* Menus Using This Category */}
      <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Menus with “{name}” Category</h2>
        {/* Placeholder content for future dynamic integration */}
        <p className="text-sm text-gray-600">This category appears in: All Day Menu</p>
      </div>

      {/* Items in This Category */}
      <CategoryItemsTable
        categoryName={name}
        items={items}
        setItems={setItems}
        onUpdateItems={(updated) => updateCategory?.(selectedCategory.id, { items: updated })}
      />

      {/* Delete Category Button */}
      <DeleteButton
        label="Delete Category 🗑️"
        confirmMessage={`Are you sure you want to delete the "${name}" category? This cannot be undone.`}
        onConfirm={() => deleteCategory?.(selectedCategory.id)}
      />
    </div>
  );
};

export default CategoryEditorPanel;
