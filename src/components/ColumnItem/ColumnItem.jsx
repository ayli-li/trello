import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { addTask, removeTask } from '../../store/task/action';

import './ColumnItem.css'

export const ColumnItem = ({ title, deleteColumn, id, column, onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop, draggable }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');
  const [descriptionCard, setDescriptionCard] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [dragColumn, setDragColumn] = useState(null);
  const [dragTask, setDragTask] = useState(null);

  const tasks = useSelector(state => state.tasks.tasks);
  //const columnList = useSelector(state => state.columns.columnList);

  const filteredTasks = tasks.filter(task => task.columnId === id);

  const dispatch = useDispatch();

  const createTask = () => {
    if (titleCard) {
      const task = {
        columnId: id,
        id: nanoid(),
        titleCard,
        descriptionCard: ''
      }

      dispatch(addTask(task));
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

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'card_task') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  const dragLeaveHanlder = (e) => {
    e.target.style.boxShadow = 'none';
  }

  const dragStartHandler = (e, column, task) => {
    setDragColumn(column);
    setDragTask(task);
    console.log(dragColumn);
    console.log(dragTask);
  }

  const dragEndHanlder = (e) => {
    e.target.style.boxShadow = 'none';
  }

  const dropHanlder = (e, task) => {
    e.preventDefault();
    const currentIndex = tasks.indexOf(dragTask);
    tasks.splice(currentIndex, 1);
    const dropIndex = tasks.indexOf(task);
    tasks.splice(dropIndex + 1, 0, dragTask);
    //console.log(tasks);
    // tasks.map(item => {
    //   if (item.columnId === task.columnId) {
    //     return task;
    //   }
    //   if (item.columnId === dragTask.columnId) {
    //     return dragTask;
    //   }
    //   return item;
    // })
  }

  return <>
    <div className='column' id={id}>
      <div className='column_items'
           onDragStart={onDragStart}
           onDragLeave={onDragLeave}
           onDragEnd={onDragEnd}
           onDragOver={onDragOver}
           onDrop={onDrop}
           draggable={draggable} >
        <span className='column_title'>{title}</span>
        <span className='close_symbol' onClick={() => deleteColumn(id) }>x</span>
      </div>   

      {filteredTasks.map(task => 
        <CardTask 
          id={task.id} 
          value={task.titleCard} 
          key={task.id} 
          deleteTask={handleDeleteTask} 
          addCurrentTask={addCurrentTask}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHanlder(e)}
          onDragStart={(e) => dragStartHandler(e, column, task)}
          onDragEnd={(e) => dragEndHanlder(e)}
          onDrop={(e) => dropHanlder(e, column, task)}
          draggable={true} /> ) }

      {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} />}       

      <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>   

    </div>

    {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
  </>
}