import React, { useState, useEffect, useRef } from 'react';

import EditableTitle from '../components/editorComponents/EditableTitle';
import DeleteButton from '../components/editorComponents/DeleteButton';
import CategorySettingsPanel from '../components/editorComponents/CategorySettingsPanel';
import CategoryItemsTable from '../components/editorComponents/CategoryItemsTable';
import CategoryMenuAssignmentPanel from '../components/editorComponents/CategoryMenuAssignmentPanel';

const CategoryEditorPanel = ({
  selectedCategory,
  updateCategory,
  deleteCategory,
  menus,
  setMenus,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [autoExpand, setAutoExpand] = useState(false);
  const [items, setItems] = useState([]);

  const didInit = useRef(false);
  const prevItemsRef = useRef([]);
  const updateTimeout = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      const newItems = selectedCategory.items || [];
      const newName = selectedCategory.name || '';
      const newDesc = selectedCategory.description || '';
      const newExpand = selectedCategory.autoExpand || false;

      if (JSON.stringify(newItems) !== JSON.stringify(prevItemsRef.current)) {
        setItems(newItems);
        prevItemsRef.current = newItems;
      }

      setName(newName);
      setDescription(newDesc);
      setAutoExpand(newExpand);
      didInit.current = true;
    }
  }, [selectedCategory]);

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
      {/* Scrollable content area including the delete button */}
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide px-4 pt-4 pb-20">
        <div className="w-full max-w-5xl mx-auto">
          <EditableTitle
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            title={name}
            setTitle={setName}
            onSave={(newName) =>
              updateCategory?.(selectedCategory.id, { name: newName })
            }
          />

          <CategorySettingsPanel
            autoExpand={autoExpand}
            setAutoExpand={setAutoExpand}
            description={description}
            setDescription={setDescription}
            onUpdate={(changes) =>
              updateCategory?.(selectedCategory.id, changes)
            }
          />

          <CategoryMenuAssignmentPanel
            menus={menus}
            setMenus={setMenus}
            categoryId={selectedCategory.id}
            categoryName={name}
          />

          <CategoryItemsTable
            categoryName={name}
            items={items}
            setItems={setItems}
          />

          {/* Make sure button is INSIDE the scrollable area but spaced from the bottom */}
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
