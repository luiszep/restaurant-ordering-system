import React from 'react';

// Centralized config for tabs
const TABS = [
  { label: 'Menus', enabled: true },
  { label: 'Categories', enabled: false },
  { label: 'Items', enabled: false },
  { label: 'Modifiers', enabled: false },
];

const MenuBuilderTabs = ({ activeTab = 'Menus', onTabClick }) => {
  const handleClick = (tab) => {
    if (tab.enabled) {
      onTabClick?.(tab.label);
    } else {
      alert(`${tab.label} view is in development (coming soon)`);
    }
  };

  return (
    <div className="flex border-b border-gray-200 bg-white px-6">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <button
            key={tab.label}
            onClick={() => handleClick(tab)}
            className={`uppercase tracking-wide px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
              isActive
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-pink-400'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBuilderTabs;
