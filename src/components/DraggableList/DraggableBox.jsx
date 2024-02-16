import React from 'react';
import './DraggableBox.css'; // Make sure to create and import the corresponding CSS file

const DraggableBox = ({ title, children, onDrop, onDragOver, onClear }) => {
  return (
    <div className='draggable-box' onDrop={onDrop} onDragOver={onDragOver}>
      <div className='draggable-box-header'>
        {title}
        <button className='clear-button' onClick={onClear}>Clear</button>
      </div>
      <div className='draggable-box-content'>
        {children}
      </div>
    </div>
  );
};

export default DraggableBox;
