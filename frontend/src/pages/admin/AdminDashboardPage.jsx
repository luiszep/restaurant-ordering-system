import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Restaurant Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold">Tables</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500">
          <h2 className="text-lg font-semibold">Menu Items</h2>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold">Staff</h2>
          <p className="text-3xl font-bold">6</p>
        </div>
      </div>

      {/* Actions / Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 w-full"
          onClick={() => window.location.href = '/admin/menu'}
        >
          Manage Menu
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 w-full"
          onClick={() => window.location.href = '/admin/tables'}
        >
          Manage Tables
        </button>
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

export default AdminDashboardPage;
