import React from 'react';

import { TaskTextarea } from './CreateTaskFormStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
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

  return <>
    <ColumnForm onSubmit={handleSubmit} formTextarea>
    
        <TaskTextarea 
          rows={3} 
          cols={21} 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => onEnterPress(e)} 
          placeholder="Input title card" />

        <CloseSign taskCloseSign onClick={() => resetAddingTask()}>&times;</CloseSign>  

    </ColumnForm>
  
  </>
}