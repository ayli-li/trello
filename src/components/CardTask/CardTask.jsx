import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, deleteTask, addCurrentTask, onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop, draggable }) => { 

  return <div 
           className='column_items card_task' 
           id={id} 
           onClick={() => addCurrentTask(id)}
           onDragStart={onDragStart}
           onDragLeave={onDragLeave} 
           onDragEnd={onDragEnd} 
           onDragOver={onDragOver} 
           onDrop={onDrop} 
           draggable={draggable} >
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id) }>x</span>
  </div>
}