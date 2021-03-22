import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask }) => { 

  return <div className='column_items card_task' 
              id={id} 
              onClick={() => addCurrentTask(id)} >
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</span>
  </div>
}