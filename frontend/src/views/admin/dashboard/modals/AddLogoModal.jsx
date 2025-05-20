import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';

const AddLogoModal = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      onSave(preview); // Pass the selected image data (base64) back to parent
      onClose();       // Close the modal after saving
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Upload Restaurant Logo
          </Dialog.Title>

          <div className="mb-4">
          <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload-input"
          />
          <label
              htmlFor="logo-upload-input"
              className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded cursor-pointer"
          >
              📁 Select Logo File
          </label>
          {preview && (
              <p className="mt-2 text-sm text-gray-600">File selected</p>
          )}
          </div>

          {preview && (
            <img
              src={preview}
              alt="Logo Preview"
              className="w-full h-48 object-contain border rounded mb-4"
            />
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Logo
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddLogoModal;
