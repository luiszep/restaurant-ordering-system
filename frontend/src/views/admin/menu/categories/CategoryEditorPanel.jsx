import React, { useState, useEffect, useRef } from 'react';

import CategoryItemsTable from '../components/editorComponents/CategoryItemsTable';
import CategoryMenuAssignmentPanel from '../components/editorComponents/CategoryMenuAssignmentPanel';
import CategorySettingsPanel from '../components/editorComponents/CategorySettingsPanel';
import DeleteButton from '../components/editorComponents/DeleteButton';
import EditableTitle from '../components/editorComponents/EditableTitle';

const CategoryEditorPanel = ({
  deleteCategory,
  menus,
  selectedCategory,
  setMenus,
  updateCategory,
}) => {
  // Local state
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [autoExpand, setAutoExpand] = useState(false);
  const [items, setItems] = useState([]);

  // Refs to control sync behavior
  const didInit = useRef(false);
  const prevItemsRef = useRef([]);
  const updateTimeout = useRef(null);

  // Initialize local state when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const newItems = selectedCategory.items || [];
      const newName = selectedCategory.name || '';
      const newDesc = selectedCategory.description || '';
      const newAutoExpand = selectedCategory.autoExpand || false;

      // Only update items if changed
      if (JSON.stringify(newItems) !== JSON.stringify(prevItemsRef.current)) {
        setItems(newItems);
        prevItemsRef.current = newItems;
      }

      setName(newName);
      setDescription(newDesc);
      setAutoExpand(newAutoExpand);
      didInit.current = true;
    }
  }, [selectedCategory]);

  // Debounce sync of items to parent
  useEffect(() => {
    if (
      didInit.current &&
      selectedCategory &&
      JSON.stringify(items) !== JSON.stringify(prevItemsRef.current)
    ) {
      clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => {
        updateCategory?.(selectedCategory.id, { items });
        prevItemsRef.current = items;
      }, 100);
    }

    return () => clearTimeout(updateTimeout.current);
  }, [items, selectedCategory, updateCategory]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide px-4 pt-4 pb-20">
        <div className="w-full max-w-5xl mx-auto">
          {/* Title Editor */}
          <EditableTitle
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            title={name}
            setTitle={setName}
            onSave={(newName) =>
              updateCategory?.(selectedCategory.id, { name: newName })
            }
          />

          {/* Settings Panel */}
          <CategorySettingsPanel
            autoExpand={autoExpand}
            setAutoExpand={setAutoExpand}
            description={description}
            setDescription={setDescription}
            onUpdate={(changes) =>
              updateCategory?.(selectedCategory.id, changes)
            }
          />

          {/* Menu Assignment Panel */}
          <CategoryMenuAssignmentPanel
            menus={menus}
            setMenus={setMenus}
            categoryId={selectedCategory.id}
            categoryName={name}
          />

          {/* Items Table */}
          <CategoryItemsTable
            categoryName={name}
            items={items}
            setItems={setItems}
          />

          {/* Delete Button */}
          <div className="mt-8">
            <DeleteButton
              label="Delete Category 🗑️"
              confirmMessage={`Are you sure you want to delete the "${name}" category? This cannot be undone.`}
              onConfirm={() => deleteCategory?.(selectedCategory.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditorPanel;
