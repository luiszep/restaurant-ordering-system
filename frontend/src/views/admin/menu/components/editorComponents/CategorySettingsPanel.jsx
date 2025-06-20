import React from 'react';

const MAX_DESCRIPTION_LENGTH = 500;

const CategorySettingsPanel = ({
  autoExpand,
  description,
  onUpdate,
  setAutoExpand,
  setDescription,
}) => {
  // Handle checkbox toggle
  const handleToggle = (e) => {
    const checked = e.target.checked;
    setAutoExpand(checked);
    onUpdate?.({ autoExpand: checked });
  };

  // Handle description update
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
      onUpdate?.({ description: value });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Category Settings</h2>

      {/* Expand toggle */}
      <div className="mb-4">
        <label className="text-sm text-gray-700 mr-3">
          <input
            type="checkbox"
            checked={autoExpand}
            onChange={handleToggle}
            className="mr-2"
          />
          Expand Category on Load
        </label>
      </div>

      {/* Description input */}
      <label className="block text-sm text-gray-700 mb-1">Description</label>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Optional description..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <div
        className={`text-right text-xs mt-1 ${
          description.length > MAX_DESCRIPTION_LENGTH - 50
            ? 'text-red-500'
            : 'text-gray-500'
        }`}
      >
        {description.length} / {MAX_DESCRIPTION_LENGTH}
      </div>
    </div>
  );
};

export default CategorySettingsPanel;
