import React from 'react';

const CategoryMenuAssignmentPanel = ({
  categoryId,
  categoryName,
  menus,
  setMenus,
}) => {
  // Exit early if no category is selected
  if (!categoryId) return null;

  // Toggle assignment of this category to a menu
  const handleToggle = (menuId) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id !== menuId) return menu;

        const categoryAssigned = menu.categories.includes(categoryId);
        const updatedCategories = categoryAssigned
          ? menu.categories.filter((id) => id !== categoryId) // Remove
          : [...menu.categories, categoryId]; // Add

        return { ...menu, categories: updatedCategories };
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Menus with “{categoryName}” Category
      </h2>

      <div className="flex flex-wrap gap-3">
        {menus.map((menu) => {
          const categoryAssigned = menu.categories.includes(categoryId);
          const buttonClasses = categoryAssigned
            ? 'bg-pink-500 text-white border-pink-500'
            : 'bg-white text-pink-600 border-pink-500 hover:bg-pink-50';

          return (
            <button
              key={menu.id}
              onClick={() => handleToggle(menu.id)}
              className={`px-4 py-2 rounded-md font-semibold border transition-colors text-sm ${buttonClasses}`}
            >
              {menu.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenuAssignmentPanel;
