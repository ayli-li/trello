import React, { useState } from 'react';

import './CardTask.css'

export const CardTask = ({ id, value, deleteTask, addCurrentTask, task, column, tasks, columnList }) => {

  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'card_task') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  const dragLeaveHanlder = (e) => {
    e.target.style.boxShadow = 'none';
  }

  const dragStartHandler = (e, column, task) => {
    setCurrentColumn(column);
    setCurrentTask(task);
  }

  const dragEndHanlder = (e) => {
    e.target.style.boxShadow = 'none';
  }

  const dropHanlder = (e, column, task) => {
    e.preventDefault();
    //const currentIndex = console.log(task);

  }

  return <div 
           className='column_items card_task' 
           id={id} 
           onClick={() => addCurrentTask(id)} 
           draggable={true}
           onDragOver={(e) => dragOverHandler(e)}
           onDragLeave={(e) => dragLeaveHanlder(e)}
           onDragStart={(e) => dragStartHandler(e, column, task)}
           onDragEnd={(e) => dragEndHanlder(e)}
           onDrop={(e) => dropHanlder(e, column, task)} >
    {value}
    <span className='close_symbol' onClick={() => deleteTask(id) }>x</span>
  </div>
}