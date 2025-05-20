import React from 'react';
import { Dialog } from '@headlessui/react';

const DeleteRestaurantModal = ({ isOpen, onClose, onConfirm, restaurantName }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-4 text-red-600">
            Delete This Restaurant?
          </Dialog.Title>
          <p className="text-gray-700 mb-4">
            <strong>{restaurantName}</strong> and all of its data will be permanently deleted. This action
            <span className="font-semibold text-red-600"> cannot be undone.</span>
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete Anyway
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteRestaurantModal;
