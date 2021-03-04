import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { addTask } from '../../store/column/action';

import './ColumnItem.css'

export const ColumnItem = ({ title, deleteColumn, id }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');

  const dispatch = useDispatch();

  const createTask = () => {
    if (titleCard) {
      const task = {
        id: nanoid(),
        titleCard,
        description: ''
      }

      dispatch(addTask(task));
    }    
  }

  const handleAddTask = () => {
    if(titleCard && isCreateTask){
      createTask()
    }
    setIsCreateTask(true)
  }

  return <div className='column' id={id}>
    <div className='column_items'>
      {title}
      <span className='close_symbol' onClick={() => deleteColumn(id) }>x</span>
    </div>

    {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} />}

    <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>
  </div>
}