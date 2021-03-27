import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';
import { TaskModal } from '../TaskModal/TaskModal';
import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn, removeTaskIdFromColumn } from '../../store/column/action';

import './ColumnItem.css'

export const ColumnItem = ({ title, deleteColumn, columnId }) => {

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [titleCard, setTitleCard] = useState('');
  const [descriptionCard, setDescriptionCard] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  //const columnList = useSelector(state => state.columns.columnList);
  const tasks = useSelector(state => state.tasks.tasks);
  
  let filteredTasks = {};
  Object.keys(tasks).map(task => {
    if (tasks[task].columnId === columnId) {
      filteredTasks[task] = tasks[task];
    }
    return false;
  });

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

    Object.keys(tasks).map(item => {
      if (tasks[item].id === idTask) {
        task = tasks[item];
      }
      return false;
    });
    
    if (Object.keys(task).length) {
      setCurrentTask(task);
      setIsShowModal(true);
    }    
  }

  //const [characters, updateCharacters] = useState(finalSpaceCharacters);

  // const handleOnDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);
  // }

  return <>
    <div className='column' id={columnId}>
      <div className='column_items'>
        <span className='column_title'>{title}</span>
        <span className='close_symbol' onClick={() => deleteColumn(columnId) }>x</span>
      </div> 

      <DragDropContext onDragEnd>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>  

              {Object.keys(filteredTasks).length ?
              Object.keys(filteredTasks).map((task, index) => 
                <CardTask 
                  id={filteredTasks[task].id} 
                  value={filteredTasks[task].titleCard} 
                  columnId={columnId}
                  key={filteredTasks[task].id} 
                  deleteTask={handleDeleteTask} 
                  addCurrentTask={addCurrentTask}
                  index={index} /> ) : false }

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {isCreateTask && <CreateTaskForm value={titleCard} setValue={setTitleCard} resetAddingTask={handleResetAddingTask} />}       

      <button className='column_btn column_item-btn' onClick={handleAddTask}>Add task</button>   

    </div>

    {isShowModal && <TaskModal value={descriptionCard} taskInfo={currentTask} setDescription={setDescriptionCard} showModal={setIsShowModal} /> }
  </>
}