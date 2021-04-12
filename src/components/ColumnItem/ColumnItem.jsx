import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OutsideClickHandler from 'react-outside-click-handler';

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

  const handleShowOutsideTitleInput = () => {
    setShowColumnTitle(true);
    setShowColumnTitleInput(false);
  }

  return <>
    <Draggable draggableId={columnId} index={index} key={columnId}>

      {(provided, snapshot) => (

        <LiColumn 
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          
          <OutsideClickHandler onOutsideClick={() => setIsCreateTask(false)}>
            <ColumnItems>

              <ColumnTitleItems>
                {showColumnTitle &&
                  <ColumnTitle onDoubleClick={handleShowTitleInput} {...provided.dragHandleProps}>
                    {title}
                  </ColumnTitle> }
                
                {showColumnTitleInput &&
                  <OutsideClickHandler onOutsideClick={() => handleShowOutsideTitleInput()}>

                    <form onSubmit={(e) => renameColumn(e)}>
                      <ColumnTitleInput
                        autoFocus={true} 
                        onChange={(e) => setColumnTitleInput(e.target.value)} 
                        value={columnTitleInput} />
                    </form>

                  </OutsideClickHandler> }

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
                          key={columnTasks[task].id}
                          id={columnTasks[task].id} 
                          value={columnTasks[task].titleCard} 
                          columnId={columnId}
                          description={columnTasks[task].descriptionCard}                       
                          deleteTask={handleDeleteTask}  
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
                  addTask={handleAddTask} /> }       

              <Btn addTask onClick={handleAddTask}>Add task</Btn>              
            </ColumnItems> 
          </OutsideClickHandler>         
        </LiColumn>      
      )}            
    </Draggable>  
  </>
}