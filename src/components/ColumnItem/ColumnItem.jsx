import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { CardTask } from '../CardTask/CardTask';

import { addTask, removeTask } from '../../store/task/action';
import { addTaskIdToColumn, removeTaskIdFromColumn, renameColumnTitle } from '../../store/column/action';

import { LiColumn, ColumnTitleItems, ColumnTitle, CloseSign, ColumnItems, UlTasks } from './ColumnItemStyled.js';
import { ColumnTitleInput } from '../CreateColumnForm/CreateColumnFormStyled.js';
import { Btn } from '../ColumnList/ColumnListStyled.js';

export const ColumnItem = ({ title, 
                             deleteColumn, 
                             columnId, 
                             columnTasks, 
                             index }) => {

  
  const [titleCard, setTitleCard] = useState('');
  const [columnTitleInput, setColumnTitleInput] = useState(title);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [showColumnTitle, setShowColumnTitle] = useState(true);
  const [showColumnTitleInput, setShowColumnTitleInput] = useState(false);

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

  const renameColumn = (e) => {
    e.preventDefault();

    if (columnTitleInput) {      
      dispatch(renameColumnTitle(columnId, columnTitleInput));
      setShowColumnTitle(true);
      setShowColumnTitleInput(false);
    }
  }

  const handleShowTitleInput = () => {
    setColumnTitleInput(title);
    setShowColumnTitle(false);
    setShowColumnTitleInput(true);
  }

  // const handleClickOutsideTitleInput = (e) => {
  //   if (e.target) {
  //     setShowColumnTitle(true);
  //     setShowColumnTitleInput(false);
  //   }
  // }

  // const [clickedOutside, setClickedOutside] = useState(false);
  // const myRef = useRef();

  // const handleClickOutside = (e) => {
  //   if (!myRef.current.contains(e.target)) {
  //     setClickedOutside(true);
  //   }
  // };

  // const handleClickInside = () => setClickedOutside(false);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // });

  // useEffect(() => {
  //   setShowColumnTitleInput(!clickedOutside);
  // }, [clickedOutside, setShowColumnTitleInput]);

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

            <ColumnTitleItems>
              {showColumnTitle &&
                <ColumnTitle onDoubleClick={handleShowTitleInput} {...provided.dragHandleProps}>
                  {title}
                </ColumnTitle> }
              
              {showColumnTitleInput &&
                <form onSubmit={(e) => renameColumn(e)}>
                  <ColumnTitleInput 
                    
                    autoFocus={true} 
                    onChange={(e) => setColumnTitleInput(e.target.value)} 
                    value={columnTitleInput} />
                </form> }

              <CloseSign onClick={() => deleteColumn(columnId) }>&times;</CloseSign>
            </ColumnTitleItems>

            <Droppable key={columnId} droppableId={columnId} type='task'>
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
                        description={columnTasks[task].descriptionCard}                       
                        deleteTask={handleDeleteTask}  
                        index={index} /> 
                    ) 
                  : false }

                  {provided.placeholder}

                </UlTasks>
              )}
            </Droppable>

            {isCreateTask && 
              <CreateTaskForm 
                value={titleCard} 
                setValue={setTitleCard} 
                resetAddingTask={handleResetAddingTask}
                addTask={handleAddTask} /> }       

            <Btn onClick={handleAddTask}>Add task</Btn>
          </ColumnItems>
        </LiColumn>      
      )}            
    </Draggable>
  </>
}