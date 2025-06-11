import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  Receipt,
  BarChart,
  Clock,
  Table,
  Gift,
  Settings,
  Copy,
  ArrowLeft,
} from 'lucide-react';

const navItems = [
  { label: 'KDS', path: 'kds', icon: <LayoutDashboard size={20} /> },
  { label: 'Orders', path: 'orders', icon: <ShoppingBag size={20} /> },
  { label: 'Menu Builder', path: 'menus', icon: <ListOrdered size={20} /> },
  { label: 'Transactions', path: 'transactions', icon: <Receipt size={20} /> },
  { label: 'Reports', path: 'reports', icon: <BarChart size={20} /> },
  { label: 'Timer', path: 'timer', icon: <Clock size={20} /> },
  { label: 'Tables', path: 'tables', icon: <Table size={20} /> },
  { label: 'Promotions', path: 'promotions', icon: <Gift size={20} /> },
  { label: 'Settings', path: 'settings', icon: <Settings size={20} /> },
];

const RestaurantDashboardLayout = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const builderTabPaths = ['/menus', '/categories', '/items', '/modifiers'];
  const isBuilderTab = builderTabPaths.some((path) =>
    location.pathname.endsWith(path)
  );

  const restaurant = useMemo(() => {
    const stored = localStorage.getItem('adminRestaurants');
    if (stored) {
      const list = JSON.parse(stored);
      return list.find((r) => r.id === id);
    }
    return null;
  }, [id]);

  return (
    <div className="flex min-h-screen bg-[#0c0c0c] text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-[#111827] shadow-lg py-6 px-3 border-r border-gray-800 flex flex-col items-center">
        {/* Back to Dashboard Button */}
        <NavLink
          to="/admin/dashboard"
          title="Back to Dashboard"
          className="mb-6 p-2 rounded-md hover:bg-[#1f2937] text-gray-400 hover:text-white transition duration-150"
        >
          <ArrowLeft size={20} />
        </NavLink>

        <nav className="flex flex-col items-center gap-6 mt-2">
          {navItems.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={`/admin/restaurant/${id}/${path}`}
              title={label}
              className={({ isActive }) =>
                `p-2 rounded-md transition duration-150 ${
                  isActive
                    ? 'bg-green-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#1f2937]'
                }`
              }
            >
              {icon}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content with Top Header */}
      <main className="flex-1 flex flex-col bg-[#0c0c0c]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-10 py-4 border-b border-gray-700 bg-[#111827] shadow-md">
          <h2 className="text-2xl font-extrabold tracking-wide">
            {restaurant?.name?.toUpperCase() || 'RESTAURANT'}
          </h2>

          <div className="flex items-center gap-2 text-sm bg-[#1f2937] text-gray-300 px-3 py-1 rounded-full font-mono tracking-tight group relative border border-gray-600">
            ID: {id.replace('restaurant-', '')}

            <button
              onClick={() => {
                navigator.clipboard.writeText(id.replace('restaurant-', ''));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="opacity-100 group-hover:opacity-100 transition-opacity"
              title="Copy to clipboard"
            >
              <Copy size={14} className="text-gray-400 hover:text-white" />
            </button>

            {copied && (
              <span className="absolute top-full mt-1 text-xs text-green-500 bg-black px-2 py-1 rounded shadow">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Main page content */}
        <div
          className={`flex-1 ${
            isBuilderTab ? 'bg-white text-black' : 'bg-[#0c0c0c] text-white'
          }`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboardLayout;
