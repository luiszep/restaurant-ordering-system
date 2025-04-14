import React from 'react';

// Component: DeleteSectionModal
// Purpose: Confirmation modal for deleting a menu section
// Props:
// - showDeleteModal: whether the modal is visible
// - sectionToDelete: the key of the section that is marked for deletion
// - handleDeleteSection: function to execute the delete
// - setShowDeleteModal: function to close the modal
// - setSectionToDelete: function to reset the section marked for deletion
const DeleteSectionModal = ({
  showDeleteModal,
  sectionToDelete,
  handleDeleteSection,
  setShowDeleteModal,
  setSectionToDelete
}) => {
  // Do not render the modal if it shouldn't be shown
  if (!showDeleteModal) return null;

  return (
    // Full-screen modal overlay
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent dark background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      {/* Modal Box */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        {/* Modal Title */}
        <h3 style={{ marginBottom: '15px' }}>Delete Section?</h3>

        {/* Modal Message */}
        <p style={{ fontSize: '14px', color: '#444' }}>
          Are you sure you want to delete this section? This action cannot be undone.
        </p>

        {/* Modal Action Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '25px',
            gap: '12px'
          }}
        >
          {/* Confirm Delete Button */}
          <button
            onClick={() => {
              handleDeleteSection(sectionToDelete);
              setShowDeleteModal(false);
              setSectionToDelete(null);
            }}
            style={{
              padding: '8px 20px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Yes, Delete
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setSectionToDelete(null);
            }}
            style={{
              padding: '8px 20px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSectionModal;
