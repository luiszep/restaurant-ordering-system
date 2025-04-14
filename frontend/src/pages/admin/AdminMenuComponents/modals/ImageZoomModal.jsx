import React from 'react';

// Component: ImageZoomModal
// Purpose: Displays a zoomed-in overlay of an image when selected.
// Props:
// - zoomImage: the image URL to display
// - setZoomImage: function to close the zoom modal
const ImageZoomModal = ({ zoomImage, setZoomImage }) => {
  // If no image is provided, do not render anything
  if (!zoomImage) return null;

  return (
    // Overlay container
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // semi-transparent black background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000 // ensures it's above all other content
      }}
      onClick={() => setZoomImage(null)} // clicking anywhere closes the modal
    >
      {/* Zoomed Image */}
      <img
        src={zoomImage}
        alt="Zoomed"
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          cursor: 'zoom-out' // indicates the user can click to close
        }}
      />
    </div>
  );
};

export default ImageZoomModal;
