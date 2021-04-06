import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { CloseSign } from '../ColumnItem/ColumnItem';
import './CardTask.css';

const LiTask = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: #172b4d;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;

  :hover {
    color: #fffffa;
    background-color: lightgray;
  }
`;

export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask, index }) => { 

  return <Draggable key={id} draggableId={id} index={index}>
           {provided => (
             <LiTask ref={provided.innerRef} 
                     {...provided.draggableProps} 
                     {...provided.dragHandleProps}
                     id={id} >
               <span onClick={() => addCurrentTask(id)} >{value}</span>
               <CloseSign className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</CloseSign>
             </LiTask>
           )}
         </Draggable>
}