import React from 'react';
import styled from 'styled-components';

import { CloseSign } from '../ColumnItem/ColumnItem';
import { ColumnForm } from '../CreateColumnForm/CreateColumnForm';

const TaskTextarea = styled.textarea`
  margin-bottom: 8px;
  border: 0.5px solid lightgray;

  :focus {
    outline: none;
  }
`;

export const CreateTaskForm = ({ value, setValue, resetAddingTask }) => {
  return <ColumnForm>
      <TaskTextarea rows={4} cols={21} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Input title card" />
      <CloseSign className='close_symbol' onClick={() => resetAddingTask()}>x</CloseSign>    
    </ColumnForm>
}