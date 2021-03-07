import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { addTask, removeTask } from '../../store/column/action';

import './ColumnItem.css'

export const ColumnItem = ({ title, deleteColumn, id }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const columnList = useSelector(state => state.columns.columnList);
  const filteredColumnList = columnList.filter(column => column.id === id);

  const dispatch = useDispatch();

  const createTask = () => {
    if (titleCard) {
      const task = {
        id: nanoid(),
        titleCard,
        description: ''
      }

      dispatch(addTask(task,id));
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

  const findCurrentTask = (idTask) => {
    const currentColumn = columnList.find(column => column.id === id);

    const task = currentColumn.tasks.find(task => task.id === idTask);
    if(task){
      setCurrentTask(task);
      setIsShowModal(true);
    }
  } 
 

  return <>
    <div className='column' id={id}>
      <div className='column_items'>
        <span className='column_title'>{title}</span>
        <span className='close_symbol' onClick={() => deleteColumn(id) }>x</span>
      </div>   

      {filteredColumnList.map(({ tasks }) => tasks
                                      .map(({ titleCard, id }) => 
                                      <CardTask id={id} value={titleCard} key={id} findCurrentTask={findCurrentTask} deleteTask={handleDeleteTask} /> )) }

      {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} />}       

      <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>   

    </div>

    {isShowModal && <TaskModal taskInfo={currentTask} showModal={setIsShowModal} /> }
  </>
}