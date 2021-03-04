import React from 'react';

import './ColumnItem.css'

export const ColumnItem = ({ title, deleteColumn, id }) => {
  return <div className='column' id={id}>
    <div className='column_items'>
      {title}
      <span className='close_symbol' onClick={(e) => deleteColumn(e, id) }>x</span>
    </div>

    <button className='column_btn column_item-btn'>Add task</button>
  </div>
}