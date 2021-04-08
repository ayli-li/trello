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
  border-top: 0.5px solid lightgray;
  ${'' /* border-bottom: 0.5px solid lightgray; */}

  :hover {
    color: #fffffa;
    background-color: rgba(255,83,73, 0.6);
  }
`;

const TaskValue = styled.span`
  min-width: 182px;
  word-wrap: break-word;
`;


export const CardTask = ({ id, value, columnId, deleteTask, addCurrentTask, index }) => { 

  return <Draggable key={id} draggableId={id} index={index}>
           {provided => (
             <LiTask ref={provided.innerRef} 
                     {...provided.draggableProps} 
                     {...provided.dragHandleProps}
                     id={id} >
               <TaskValue onClick={() => addCurrentTask(id)} >{value}</TaskValue>
               <CloseSign className='close_symbol' onClick={() => deleteTask(id, columnId) }>x</CloseSign>
             </LiTask>
           )}
         </Draggable>
}