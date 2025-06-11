import React from 'react';

const CategorySettingsPanel = ({ autoExpand, setAutoExpand, description, setDescription, onUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Category Settings</h2>

      <div className="mb-4">
        <label className="text-sm text-gray-700 mr-3">
          <input
            type="checkbox"
            checked={autoExpand}
            onChange={(e) => {
              setAutoExpand(e.target.checked);
              onUpdate?.({ autoExpand: e.target.checked });
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
            onUpdate?.({ description: value });
          }
        }}
        placeholder="Optional description..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <div className={`text-right text-xs mt-1 ${description.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
        {description.length} / 500
      </div>
    </div>
  );
};

export default CategorySettingsPanel;
