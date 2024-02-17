import React from 'react';
import './ColumnList.css';

const ColumnList = ({ title, columns, onDragStart }) => {
  return (
    <div className='column-list'>
      <div className='column-list-header'>{title}</div>
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
