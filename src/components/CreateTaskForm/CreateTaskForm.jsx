import React from 'react';

import { TaskTextarea } from './CreateTaskFormStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
import { ColumnForm } from '../CreateColumnForm/CreateColumnFormStyled.js';

export const CreateTaskForm = ({ value, setValue, resetAddingTask }) => {
  return <>
    <ColumnForm>
    
        <TaskTextarea 
          rows={3} 
          cols={23} 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Input title card" />

        <CloseSign taskCloseSign onClick={() => resetAddingTask()}>&times;</CloseSign>  

    </ColumnForm>
  
  </>
}