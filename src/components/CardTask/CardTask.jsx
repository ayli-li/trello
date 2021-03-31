import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './CardTask.css'

export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask, index }) => { 

  return <Draggable key={id} draggableId={id} index={index}>
           {(provided, snapshot) => (
             <li ref={provided.innerRef} 
                 isDragging={snapshot.isDragging}
                 {...provided.draggableProps} 
                 {...provided.dragHandleProps}
                 className='column_items card_task' 
                 id={id} >
               <div className='card_value' onClick={() => addCurrentTask(id)} >{value}</div>
               <span className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</span>
             </li>
           )}
         </Draggable>
}