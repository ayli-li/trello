import React from 'react';

import { TaskTextarea } from './CreateTaskFormStyled.js';
import { ColumnForm } from '../CreateColumnForm/CreateColumnFormStyled.js';

export const CreateTaskForm = ({ value, setValue, resetAddingTask, addTask }) => {

  const handleSubmit = () => {
    addTask();
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return <ColumnForm onSubmit={handleSubmit} formTextarea>    
    <TaskTextarea 
      autoFocus={true}
      rows={3} 
      cols={21}  
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => onEnterPress(e)} 
      placeholder="Input title card" />
  </ColumnForm>
}