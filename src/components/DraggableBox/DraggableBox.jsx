import React from "react";
import "./DraggableBox.css"; // Make sure to create and import the corresponding CSS file

const DraggableBox = ({ title, children, onDrop, onDragOver, onClear, placeholder }) => {
  return (
    <div className="draggable-box" onDrop={onDrop} onDragOver={onDragOver} data-testid="draggable-box">
      <div className="draggable-box-header">
        {title}
        <button className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="draggable-box-content">
        {children || <div className="placeholder">{placeholder}</div>}
      </div>
    </div>
  );
};

export default DraggableBox;
