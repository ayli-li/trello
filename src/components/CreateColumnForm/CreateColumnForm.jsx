import React from 'react';
import styled from 'styled-components';

import { LiColumn, CloseSign } from '../ColumnItem/ColumnItem';
import { Btn } from '../ColumnList/ColumnList';

import './CreateColumnForm.css';

export const ColumnForm = styled.form`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: #172b4d;
  font-size: 16px;
  padding-left: 5px;
  padding-top: 5px;
  padding-right: 4px;
  margin-bottom: 5px;
`;

const ColumnTitleInput = styled.input.attrs(props => ({
  type: 'text',
}))`
  border: 0.5px solid lightgray; 
  margin-right: 3px;
  max-width: 175px;
  padding: 0 0 0 3px;
  color: #172b4d;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    outline: none;
  }
`;

export const CreateColumnForm = ({ value, setValue, addColumn, resetAddingColumn }) => {
  return <>
    <LiColumn>
      <ColumnForm> 
        <ColumnTitleInput value={value} onChange={(e) => setValue(e.target.value)} />
        <CloseSign onClick={() => resetAddingColumn()}>x</CloseSign>
      </ColumnForm>
      <Btn onClick={() => addColumn()}>Add column</Btn>
    </LiColumn>
  </>
}