import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const MenuListSidebar = ({ menus, setMenus, selectedMenuId, setSelectedMenuId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuClick = (id) => setSelectedMenuId(id);

  const handleCreateMenu = () => {
    const newId = Date.now();
    const newMenu = {
      id: newId,
      name: 'New Menu',
      startTime: '00:00:00',
      endTime: 'N/A',
      selectedDays: [],
      description: '',
      categories: [],
    };
    setMenus((prev) => [...prev, newMenu]);
    setSelectedMenuId(newId);
  };

  /*
    NOTE: Drag-and-drop reordering is implemented using @hello-pangea/dnd.
    There may be a very brief "jolt" or layout shift when dropping a dragged item.
    This is a known visual artifact caused by React's re-render timing combined
    with how the drag library updates DOM order.

    The behavior is minor, purely visual, and does not affect functionality.
    If smoother animation is ever required, consider switching to `dnd-kit`
    or using a lower-level animation solution like Framer Motion.
  */
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(menus);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setMenus(reordered);
  };

  const filteredMenus = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return menus.filter((m) => m.name.toLowerCase().includes(term));
  }, [menus, searchTerm]);

  const isSearchActive = searchTerm.trim() !== '';

  return (
    <div className="w-[260px] bg-white border-r border-gray-200 flex flex-col p-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search menus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-500 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
        />
      </div>

      {/* Menu List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="menu-sidebar">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 overflow-y-auto space-y-2"
            >
              {isSearchActive ? (
                filteredMenus.length > 0 ? (
                  filteredMenus.map((menu) => (
                    <div
                      key={menu.id}
                      onClick={() => handleMenuClick(menu.id)}
                      className={`w-full px-4 py-2 text-left rounded-md border ${
                        selectedMenuId === menu.id
                          ? 'bg-pink-500 text-white font-semibold'
                          : 'bg-gray-100 text-gray-800 hover:bg-pink-100'
                      }`}
                    >
                      {menu.name}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No matching menus.</p>
                )
              ) : (
                menus.map((menu, index) => (
                  <Draggable key={menu.id} draggableId={String(menu.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-2 border rounded-md px-2 py-2 bg-white hover:bg-gray-50 transition-all duration-200 ease-in-out"
                      >
                        <span
                          {...provided.dragHandleProps}
                          className="text-gray-400 hover:text-gray-600 cursor-grab text-lg"
                          title="Drag to reorder"
                        >
                          ≡
                        </span>
                        <button
                          onClick={() => handleMenuClick(menu.id)}
                          className={`flex-1 text-left text-sm rounded px-2 py-1 ${
                            selectedMenuId === menu.id
                              ? 'bg-pink-500 text-white font-semibold'
                              : 'bg-gray-100 text-gray-800 hover:bg-pink-100'
                          }`}
                        >
                          {menu.name}
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Create Menu Button */}
      <button
        onClick={handleCreateMenu}
        className="mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
      >
        + Create Menu
      </button>
    </div>
  );
};

export default MenuListSidebar;
