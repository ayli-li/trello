import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
//import { Btn } from '../ColumnList/ColumnList';

import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn, removeTaskIdFromColumn } from '../../store/column/action';

import './ColumnItem.css';

export const LiColumn = styled.li`
  min-width: 200px;
  box-sizing: border-box;
  height: min-content;
  margin-right: 50px;
  border: 0.5px solid gray;
  border-radius: 1.5px;
  list-style: none;
  background-color: #ebecf0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

const ColumnTitleItems = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 10px;
  min-width: 185px;
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 5px;
`;

const ColumnTitle = styled.span`
  text-align: center;
  color: #172b4d;
  font-size: 16px;
  font-weight: bold;
`;

export const CloseSign = styled.span`
  cursor: pointer;
  margin-right: 3px;
`;

export const ColumnItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: #172b4d;
  font-size: 16px;
`;

const TaskBtn = styled.button`
  background-color: #ebecf0;
  border: 0.5px solid gray;
  color: #172b4d;
  border-radius: 1.5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover {
    color: #fffffa;
    background-color: lightgray;
  }
`;

export const ColumnItem = ({ title, deleteColumn, columnId, columnTasks, index }) => {

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

    setIsCreateTask(true);
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
    <Draggable key={columnId} draggableId={columnId} index={index}>
      {provided => (
        <LiColumn {...provided.draggableProps}
                  ref={provided.innerRef}>
          <ColumnItems>
            <ColumnTitleItems {...provided.dragHandleProps}>
              <ColumnTitle>{title}</ColumnTitle>
              <CloseSign onClick={() => deleteColumn(columnId) }>x</CloseSign>
            </ColumnTitleItems>

            <Droppable droppableId={columnId} type='task'>
              {provided => (
                <ul {...provided.droppableProps} 
                    ref={provided.innerRef} >

                  {Object.keys(columnTasks).length ?
                  Object.keys(columnTasks).map((task, index) => 
                    <CardTask id={columnTasks[task].id} 
                              value={columnTasks[task].titleCard} 
                              columnId={columnId}
                              key={columnTasks[task].id} 
                              deleteTask={handleDeleteTask} 
                              addCurrentTask={addCurrentTask}
                              index={index} /> ) 
                  : false }

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>

            {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} createTask={setIsCreateTask} />}       

            <TaskBtn onClick={() => handleAddTask()}>Add task</TaskBtn>

            {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
          
          </ColumnItems>
        </LiColumn>      
      )}            
    </Draggable>
  </>
}