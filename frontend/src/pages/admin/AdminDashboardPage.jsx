// --- React Imports ---
import React from 'react';

// --- AdminDashboardPage Component ---
const AdminDashboardPage = () => {
  return (
    <div className="p-6 text-gray-800">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Your Restaurant Dashboard
      </h1>

      {/* --- Quick Stats Overview --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Tables Card */}
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold">Tables</h2>
          <p className="text-3xl font-bold">12</p>
        </div>

        {/* Total Menu Items Card */}
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500">
          <h2 className="text-lg font-semibold">Menu Items</h2>
          <p className="text-3xl font-bold">42</p>
        </div>

        {/* Total Staff Members Card */}
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold">Staff</h2>
          <p className="text-3xl font-bold">6</p>
        </div>
      </div>

      {/* --- Action Buttons for Navigation --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigate to Menu Management */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 w-full"
          onClick={() => window.location.href = '/admin/menu'}
        >
          Manage Menu
        </button>

        {/* Navigate to Table Management */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 w-full"
          onClick={() => window.location.href = '/admin/tables'}
        >
          Manage Tables
        </button>

        {/* Navigate to Staff Management */}
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 w-full"
          onClick={() => window.location.href = '/admin/staff'}
        >
          Manage Staff
        </button>
      </div>
    </div>
  );
};

// --- Export Component ---
export default AdminDashboardPage;
