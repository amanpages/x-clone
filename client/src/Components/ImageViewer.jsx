import React from "react";

const ImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div className="image-viewer-overlay">
      <div className="image-viewer-container">
        <img src={imageUrl} alt="Preview" className="preview-image" />
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
