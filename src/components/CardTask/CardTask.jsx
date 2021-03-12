import React from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, deleteTask, addCurrentTask }) => {

  const dragOverHandler = (e, board, item) => {

  }

  const dragLeaveHanlder = (e) => {

  }

  const dragStartHandler = (e) => {

  }

  const dragEndHanlder = (e) => {

  }

  const dropHanlder = (e, board, item) => {

  }

  return <div 
           className='column_items card_task' 
           id={id} 
           onClick={() => addCurrentTask(id)} 
           draggable={true}
           onDragOver={(e) => dragOverHandler(e, board, item)}
           onDragLeave={(e) => dragLeaveHanlder(e)}
           onDragStart={(e) => dragStartHandler(e)}
           onDragEnd={(e) => dragEndHanlder(e)}
           onDrop={(e) => dropHanlder(e, board, item)} >
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id) }>x</span>
  </div>
}