import React from 'react';
import './ColumnList.css'; // Make sure to create and import the corresponding CSS file

const ColumnList = ({ columns, onDragStart }) => {
  return (
    <div className='column-list'>
      <div className='column-list-header'>Columns</div>
      {columns.map(column => (
        <div
          className='column-list-item'
          key={column.name}
          draggable
          onDragStart={(e) => onDragStart(e, column)}
        >
          {column.name}
        </div>
      ))}
    </div>
  );
};

export default ColumnList;
