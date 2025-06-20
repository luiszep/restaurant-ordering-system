import React from 'react';

const EditableTitle = ({
  isEditing,
  onSave,
  setIsEditing,
  setTitle,
  title,
}) => {
  const handleSave = () => {
    setIsEditing(false);
    onSave(title);
  };

  return (
    <div className="mb-4 pl-2">
      {isEditing ? (
        <input
          type="text"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
          className="text-3xl font-bold text-gray-800 bg-transparent border-none px-1 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      ) : (
        <h1
          className="text-3xl font-bold text-gray-800 cursor-pointer hover:underline"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default EditableTitle;
