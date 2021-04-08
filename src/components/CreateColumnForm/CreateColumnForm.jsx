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
  padding-top: 4px;
  padding-right: 4px;
  margin-bottom: 5px;
`;

export const CreateColumnForm = ({ value, setValue, addColumn, resetAddingColumn }) => {
  return <>
    <LiColumn>
      <ColumnForm> 
        <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        <CloseSign onClick={() => resetAddingColumn()}>x</CloseSign>
      </ColumnForm>
      <Btn onClick={() => addColumn()}>Add column</Btn>
    </LiColumn>
  </>
}