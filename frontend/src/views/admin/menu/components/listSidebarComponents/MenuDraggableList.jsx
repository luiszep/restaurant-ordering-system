import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const MenuDraggableList = ({
  filteredMenus,
  handleDragEnd,
  handleMenuClick,
  isSearchActive,
  menus,
  selectedMenuId,
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="menu-sidebar">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 overflow-y-auto space-y-2"
          >
            {/* If search is active, show filtered non-draggable list */}
            {isSearchActive ? (
              filteredMenus.length > 0 ? (
                filteredMenus.map((menu) => {
                  const isSelected = selectedMenuId === menu.id;
                  const buttonClasses = isSelected
                    ? 'bg-pink-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-800 hover:bg-pink-100';

                  return (
                    <div
                      key={menu.id}
                      onClick={() => handleMenuClick(menu.id)}
                      className={`w-full px-4 py-2 text-left rounded-md border ${buttonClasses}`}
                    >
                      {menu.name}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-400 italic">No matching menus.</p>
              )
            ) : (
              // Otherwise, show full draggable list
              menus.map((menu, index) => {
                const isSelected = selectedMenuId === menu.id;
                const buttonClasses = isSelected
                  ? 'bg-pink-500 text-white font-semibold'
                  : 'bg-gray-100 text-gray-800 hover:bg-pink-100';

                return (
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
                          className={`flex-1 text-left text-sm rounded px-2 py-1 ${buttonClasses}`}
                        >
                          {menu.name}
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MenuDraggableList;
