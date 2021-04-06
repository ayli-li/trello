import React from 'react';

import { CloseSign } from '../ColumnItem/ColumnItem';
import { ColumnForm } from '../CreateColumnForm/CreateColumnForm';

export const CreateTaskForm = ({ value, setValue, resetAddingTask }) => {
  return <ColumnForm>
      <textarea rows={4} cols={23} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Input title card" />
      <CloseSign className='close_symbol' onClick={() => resetAddingTask()}>x</CloseSign>    
    </ColumnForm>
}