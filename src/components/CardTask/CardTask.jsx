import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask }) => { 

  return <div className='column_items card_task' 
              id={id} >
    <div className='card_value' onClick={() => addCurrentTask(id)} >{value}</div>
    <span className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</span>
  </div>
}