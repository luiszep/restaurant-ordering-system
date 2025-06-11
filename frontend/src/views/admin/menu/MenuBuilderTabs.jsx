import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TABS = [
  { label: 'Menus', path: 'menus', enabled: true },
  { label: 'Categories', path: 'categories', enabled: true },
  { label: 'Items', path: 'items', enabled: false },
  { label: 'Modifiers', path: 'modifiers', enabled: false },
];

const MenuBuilderTabs = ({ activeTab = 'Menus' }) => {
  const navigate = useNavigate();
  const { id: restaurantId } = useParams();

  const handleClick = (tab) => {
    if (!tab.enabled) {
      alert(`${tab.label} view is in development (coming soon)`);
      return;
    }

    navigate(`/admin/restaurant/${restaurantId}/${tab.path}`);
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
