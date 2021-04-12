import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TaskModal } from '../TaskModal/TaskModal';

import { LiTask, TaskValue } from './CardTaskStyled.js';

export const CardTask = ({ id, value, columnId, description, deleteTask, index }) => { 

  const [isShowModal, setIsShowModal] = useState(false);

  return <Draggable key={id} draggableId={id} index={index}>
    {(provided, snapshot) => (

      <LiTask 
        ref={provided.innerRef} 
        {...provided.draggableProps}
        id={id} >

        <TaskValue 
          isDragging={snapshot.isDragging} 
          {...provided.dragHandleProps} 
          onClick={() => setIsShowModal(true)} >

          {value}
          
        </TaskValue>          
        
        {isShowModal && 
          <TaskModal
            id={id}
            columnId={columnId}
            value={value}
            description={description}
            showModal={setIsShowModal}
            deleteTask={deleteTask} /> }
                 
      </LiTask>

    )}

  </Draggable>
}