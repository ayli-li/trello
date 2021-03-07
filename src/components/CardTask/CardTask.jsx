import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, findCurrentTask, deleteTask }) => {
  return <div className='column_items card_task' id={id} onClick={() => findCurrentTask(id)}>
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id) }>x</span>
  </div>
}