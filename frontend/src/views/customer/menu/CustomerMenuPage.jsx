import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const CustomerMenuPage = () => {
  const { id } = useParams(); // restaurant ID from URL

  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [categoriesMap, setCategoriesMap] = useState({});

  // Load restaurant info
  useEffect(() => {
    const stored = localStorage.getItem('adminRestaurants');
    if (stored) {
      const list = JSON.parse(stored);
      const found = list.find((r) => r.id === id);
      setRestaurant(found || null);
    }
  }, [id]);

  // Load menus for this restaurant
  useEffect(() => {
    const menusKey = `menus-${id}`;
    const selectedKey = `selectedMenuId-${id}`;
    const storedMenus = localStorage.getItem(menusKey);
    const storedSelectedId = localStorage.getItem(selectedKey);

    if (storedMenus) {
      const parsedMenus = JSON.parse(storedMenus);
      setMenus(parsedMenus);
      setSelectedMenuId(JSON.parse(storedSelectedId) || parsedMenus[0]?.id);
    }
  }, [id]);

  useEffect(() => {
    const categoryKey = `categories-restaurant-${id}`;
    const stored = localStorage.getItem(categoryKey);

    if (stored) {
      const list = JSON.parse(stored); // full category array
      const map = Object.fromEntries(list.map(cat => [String(cat.id), cat])); // Force string keys
      setCategoriesMap(map);
    }
  }, [id]);

  const selectedMenu = useMemo(
    () => menus.find((menu) => menu.id === selectedMenuId),
    [menus, selectedMenuId]
  );

  // Show loading or not found
  if (!restaurant || !selectedMenu) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-sm bg-white">
        Loading menu...
      </div>
    );
  }

console.log("📦 Selected Menu:", selectedMenu);
console.log("📚 Categories Map:", categoriesMap);
console.log("🧩 Resolved Categories:", selectedMenu.categories?.map(id => categoriesMap[id]));


  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-4">
      {/* Logo and Restaurant Name */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={restaurant.logo || '/images/restaurant.png'}
          alt="Restaurant Logo"
          className="w-20 h-20 object-contain rounded-xl shadow-sm mb-2 bg-white"
        />
        <h1 className="text-xl font-bold text-center">{restaurant.name}</h1>
      </div>

      {/* Menu Tabs */}
      <div className="flex overflow-x-auto space-x-3 pb-3 scrollbar-hide -mx-4 px-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => {
              setSelectedMenuId(menu.id);
              localStorage.setItem(`selectedMenuId-${id}`, JSON.stringify(menu.id));
            }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${
              selectedMenuId === menu.id
                ? 'bg-black text-white font-semibold'
                : 'bg-gray-100 text-gray-800 border-gray-300'
            }`}
          >
            {menu.name}
          </button>
        ))}
      </div>

      {/* Category List */}
      <div className="mt-4 space-y-4">
        {selectedMenu.categories?.length > 0 ? (
          selectedMenu.categories.map((catId) => {
            const category = categoriesMap[catId];
            if (!category) return null;

            return (
              <div
                key={category.id}
                className="border border-gray-200 rounded-md px-4 py-3 bg-white shadow-sm"
              >
                <h2 className="text-md font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">🍽️</span> {category.name}
                </h2>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 text-sm italic">
            No categories found in this menu.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMenuPage;
