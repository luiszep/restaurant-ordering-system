import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const MenuDraggableList = ({
  menus,
  filteredMenus,
  selectedMenuId,
  handleMenuClick,
  handleDragEnd,
  isSearchActive
}) => (
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
);

export default MenuDraggableList;
