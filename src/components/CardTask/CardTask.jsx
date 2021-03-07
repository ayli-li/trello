import React from 'react';

export const CardTask = ({ id, value }) => {
  return <div id={id} className='column_items'>
    {value}
    <span className='close_symbol'>x</span>
  </div>
}