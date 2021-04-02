import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn, removeTaskIdFromColumn } from '../../store/column/action';

import './ColumnItem.css'

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
      }

      dispatch(addTask(task));
      dispatch(addTaskIdToColumn(task.id, columnId));
      setTitleCard('');
    }    
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
        <li className='li_column'
            {...provided.draggableProps}
            ref={provided.innerRef}>
          <div className='column' id={columnId}>
            <div className='column_items'>
              <span className='column_title'
                     {...provided.dragHandleProps}>{title}</span>
              <span className='close_symbol' onClick={() => deleteColumn(columnId) }>x</span>
            </div>
            
            <Droppable droppableId={columnId}
                      type='task'>
              {provided => (
                <ul className={columnId} 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} >  

                  {Object.keys(columnTasks).length ?
                  Object.keys(columnTasks).map((task, index) => 
                    <CardTask 
                      id={columnTasks[task].id} 
                      value={columnTasks[task].titleCard} 
                      columnId={columnId}
                      key={columnTasks[task].id} 
                      deleteTask={handleDeleteTask} 
                      addCurrentTask={addCurrentTask}
                      index={index} /> ) : false }

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>

            {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} />}       

            <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>   

            {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
          </div>  
        </li>      
      )}            
    </Draggable>
  </>
}