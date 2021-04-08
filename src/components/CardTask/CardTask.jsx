import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { CloseSign } from '../ColumnItem/ColumnItem';
import './CardTask.css';

const LiTask = styled.li`
  display: flex;
  flex-flow: row nowrap;  
  cursor: pointer;
`;

const TaskValue = styled.div`
  min-width: 166px;
  margin: 5px;
  padding: 5px;
  border: 0.5px solid lightgray;
  border-radius: 3px;
  font-size: 14px;
  word-wrap: break-word;
  color: ${props => (props.isDragging ? 'white' : '#172b4d')};
  background-color: ${props => (props.isDragging ? '#ff9892' : 'white')};

  :hover {
    color: #fffffa;
    background-color: #ff9892;
    transition: 0.5s;
  }
`;


export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask, index }) => { 

  return <Draggable key={id} draggableId={id} index={index}>
           {(provided, snapshot) => (
             <LiTask ref={provided.innerRef} 
                     {...provided.draggableProps} 
                     {...provided.dragHandleProps}                     
                     id={id} >
               <TaskValue onClick={() => addCurrentTask(id)} isDragging={snapshot.isDragging} >{value}</TaskValue>
               <CloseSign className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</CloseSign>
             </LiTask>
           )}
         </Draggable>
}