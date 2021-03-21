import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn } from '../../store/column/action';

import './ColumnItem.css'

export const ColumnItem = ({ title, 
                             deleteColumn, 
                             columnId }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');
  const [descriptionCard, setDescriptionCard] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const tasks = useSelector(state => state.tasks.tasks);
  const columnList = useSelector(state => state.columns.columnList);

  const dispatch = useDispatch();

  const createTask = () => {
    if (titleCard) {
      const task = {
        id: nanoid(),
        titleCard,
        descriptionCard: ''
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

  const handleDeleteTask = (id) => dispatch(removeTask(id));

  const addCurrentTask = (idTask) => {
    const task = tasks.find(task => task.id === idTask);
    
    if (task) {
      setCurrentTask(task);
      setIsShowModal(true);
    }
  }

  return <>
    <div className='column' id={columnId}>
      <div className='column_items'>
        <span className='column_title'>{title}</span>
        <span className='close_symbol' onClick={() => deleteColumn(columnId) }>x</span>
      </div>   

      {Object.keys(columnList).map(column => columnList[column].id === columnId ? 
       tasks.map(({ id, titleCard }) => 
        <CardTask 
          id={id} 
          value={titleCard} 
          key={id} 
          deleteTask={handleDeleteTask} 
          addCurrentTask={addCurrentTask} /> ) : false) }

      {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} />}       

      <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>   

    </div>

    {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
  </>
}