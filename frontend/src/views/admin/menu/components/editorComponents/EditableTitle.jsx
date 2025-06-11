import React from 'react';

const EditableTitle = ({ isEditing, setIsEditing, title, setTitle, onSave }) => {
  return (
    <div className="mb-4 pl-2">
      {isEditing ? (
        <input
          className="text-3xl font-bold text-gray-800 bg-transparent border-none px-1 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onSave(title);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false);
              onSave(title);
            }
          }}
          autoFocus
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
