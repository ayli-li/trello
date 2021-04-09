import React from 'react';
import styled from 'styled-components';

import { CloseSign } from '../ColumnItem/ColumnItem';
import { ColumnForm } from '../CreateColumnForm/CreateColumnForm';

const TaskTextarea = styled.textarea`
  resize: none;
  margin-bottom: 8px;
  border: 0.5px solid lightgray;
  color: #172b4d;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    outline: none;
  }
`;

export const CreateTaskForm = ({ value, setValue, resetAddingTask }) => {
  return <ColumnForm>
      <TaskTextarea rows={3} cols={24} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Input title card" />
      <CloseSign className='close_symbol' onClick={() => resetAddingTask()}>&times;</CloseSign>    
    </ColumnForm>
}