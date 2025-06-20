// localStorageHelpers.js
// Utility functions to generate scoped localStorage keys for each restaurant

// Menu keys
export const getMenusKey = (id) => `menus-${id}`;
export const getSelectedMenuKey = (id) => `selectedMenuId-${id}`;

// Category keys
export const getCategoriesKey = (id) => `categories-${id}`;
export const getSelectedCategoryKey = (id) => `selectedCategoryId-${id}`;
