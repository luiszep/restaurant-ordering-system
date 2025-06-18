import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const MenuCategoriesTable = ({
  menuName,
  menuCategoryIds,
  categories,
  handleDragEnd,
  handleDeleteCategory,
  onAddCategoryClick,
}) => {
  const navigate = useNavigate();
  const { id: restaurantId } = useParams();

  const handleCategoryClick = (categoryId) => {
    localStorage.setItem('jumpToCategoryId', categoryId);
    navigate(`/admin/restaurant/${restaurantId}/menus/categories`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          Categories in {menuName || 'Unnamed'} Menu
        </h2>
        {menuCategoryIds.length < categories.length && (
          <button
            onClick={onAddCategoryClick}
            className="text-sm bg-green-100 text-green-700 font-medium px-3 py-1 rounded hover:bg-green-200 transition"
          >
            + Add Category
          </button>
        )}
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-[140px_1fr_140px_100px] bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-2">
          <div>Category Position</div>
          <div>Name</div>
          <div>Number of Items</div>
          <div>Actions</div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="category-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {menuCategoryIds.map((catId, index) => {
                  const cat = categories.find((c) => c.id === catId);
                  if (!cat) return null;

                  const itemCount = Array.isArray(cat.items)
                    ? cat.items.length
                    : 0;

                  return (
                    <Draggable
                      key={String(cat.id)}
                      draggableId={String(cat.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="grid grid-cols-[140px_1fr_140px_100px] items-center text-sm text-gray-700 border-t px-4 py-2 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <span {...provided.dragHandleProps} className="cursor-move text-lg">≡</span>
                            <span className="text-gray-500">#{index + 1}</span>
                          </div>
                          <div
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => handleCategoryClick(cat.id)}
                          >
                            {typeof cat.name === 'string' ? cat.name : 'Unnamed'}
                          </div>
                          <div>{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
                          <div>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MenuCategoriesTable;
