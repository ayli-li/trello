import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TaskModal } from '../TaskModal/TaskModal';

import { LiTask, TaskValueItems, TaskValue } from './CardTaskStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';

export const CardTask = ({ id, value, columnId, description, deleteTask, index }) => { 

  const [isShowModal, setIsShowModal] = useState(false);

  return <Draggable key={id} draggableId={id} index={index}>
    {(provided, snapshot) => (

      <LiTask 
        ref={provided.innerRef} 
        {...provided.draggableProps} 
        {...provided.dragHandleProps}                     
        id={id} >

        <TaskValueItems isDragging={snapshot.isDragging}>
          <TaskValue onClick={() => setIsShowModal(true)} >
            {value}
          </TaskValue>
          
          
          <CloseSign 
            className='close_symbol' 
            onClick={() => deleteTask(id, columnId)} 
            isDragging={snapshot.isDragging}>&times;</CloseSign>
        </TaskValueItems>
        
        {isShowModal && 
          <TaskModal 
            id={id}
            value={value}
            description={description}
            showModal={setIsShowModal} /> }
                 
      </LiTask>

    )}

  </Draggable>
}