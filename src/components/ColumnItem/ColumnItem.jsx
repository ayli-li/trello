import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { Btn } from '../ColumnList/ColumnList';

import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn, removeTaskIdFromColumn } from '../../store/column/action';

import './ColumnItem.css';

export const LiColumn = styled.li`
  max-width: 200px;
  box-sizing: border-box;
  height: min-content;
  margin-right: 50px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: white;
`;

const ColumnTitleItems = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 6px;
  min-width: 200px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 4px;
`;

const ColumnTitle = styled.span`
  flex-grow: 2;
  text-align: center;
  color: #172b4d;
  font-size: 16px;
  font-weight: 500;
  word-wrap: break-word;
  max-width: 175px;
`;

export const CloseSign = styled.span`
  cursor: pointer;
  display: ${props => (props.isDragging ? 'none' : 'flex')};

  :hover {
    color: #ff9892;
    transition: 0.5s;
  }
`;

export const ColumnItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: #172b4d;
  font-size: 16px;
`;

const UlTasks = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;  
  background-color: ${props => (props.isDraggingOver ? 'rgba(0,255,255, 0.1)' : 'white')}
`;

// const TaskBtn = styled.button`
//   background-color: #fff;
//   border: 0.5px solid lightgray;
//   padding: 4px;
//   color: #172b4d;
//   border-radius: 5px;
//   cursor: pointer;
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;

//   :hover {
//     background-color: rgba(0,255,255, 0.3);
//     transition: 0.5s;
//   }

//   :focus {
//   outline: none;
// }
// `;

export const ColumnItem = ({ title, deleteColumn, columnId, columnTasks, index, handleOnDragStart }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');
  const [descriptionCard, setDescriptionCard] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const dispatch = useDispatch();

  const createTask = () => {
    if (titleCard) {
      const task = {
        id: nanoid(),
        titleCard,
        descriptionCard: '',
        columnId
      };

      dispatch(addTask(task));
      dispatch(addTaskIdToColumn(task.id, columnId));
      setTitleCard('');      
    }; 
  }

  const handleAddTask = () => {
    if (titleCard && isCreateTask) {
      createTask();
    }

    setIsCreateTask(prev => !prev);
  }

  const handleResetAddingTask = () => setIsCreateTask(false);

  const handleDeleteTask = (id, columnId) => {
    dispatch(removeTask(id));
    dispatch(removeTaskIdFromColumn(id, columnId));
  }

  const addCurrentTask = (idTask) => {
    let task = {};

    Object.keys(columnTasks).map(item => {
      if (columnTasks[item].id === idTask) {
        task = columnTasks[item];
      }
      return false;
    });
    
    if (Object.keys(task).length) {
      setCurrentTask(task);
      setIsShowModal(true);
    }    
  }

  return <>
    <Draggable 
      key={columnId} 
      draggableId={columnId} 
      index={index}>
      {(provided, snapshot) => (

        <LiColumn 
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging} >

          <ColumnItems>

            <ColumnTitleItems {...provided.dragHandleProps}>
              <ColumnTitle>{title}</ColumnTitle>
              <CloseSign onClick={() => deleteColumn(columnId) }>&times;</CloseSign>
            </ColumnTitleItems>

            <Droppable droppableId={columnId} type='task'>
              {(provided, snapshot) => (
                <UlTasks 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver} >

                  {Object.keys(columnTasks).length ?
                  Object.keys(columnTasks).map((task, index) => 
                    <CardTask 
                      id={columnTasks[task].id} 
                      value={columnTasks[task].titleCard} 
                      columnId={columnId}
                      key={columnTasks[task].id} 
                      deleteTask={handleDeleteTask} 
                      addCurrentTask={addCurrentTask}
                      index={index} /> ) 
                  : false }

                  {provided.placeholder}
                </UlTasks>
              )}
            </Droppable>

            {isCreateTask && 
              <CreateTaskForm 
                value={titleCard} 
                setValue={setTitleCard} 
                resetAddingTask={handleResetAddingTask} /> }       

            <Btn onClick={handleAddTask}>Add task</Btn>

            {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
          
          </ColumnItems>
        </LiColumn>      
      )}            
    </Draggable>
  </>
}