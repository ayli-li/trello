import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, deleteTask, addCurrentTask }) => { 

  return <div className='column_items card_task' 
              id={id} 
              onClick={() => addCurrentTask(id)} >
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id) }>x</span>
  </div>
}