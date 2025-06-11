import React from 'react';

const DeleteButton = ({ label, confirmMessage, onConfirm, className = '' }) => {
  const handleClick = () => {
    if (window.confirm(confirmMessage)) {
      onConfirm?.();
    }
  };

  return (
    <div className="mt-6 text-right">
      <button
        onClick={handleClick}
        className={`bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default DeleteButton;
