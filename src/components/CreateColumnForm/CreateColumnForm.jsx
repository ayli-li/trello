import React from 'react';
//import styled from 'styled-components';

import { LiColumn, CloseSign } from '../ColumnItem/ColumnItem';
import { Btn } from '../ColumnList/ColumnList';

import './CreateColumnForm.css';

export const CreateColumnForm = ({ value, setValue, addColumn, resetAddingColumn }) => {
  return <>
    <LiColumn>
      <form className='column_items'> 
        <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        <CloseSign onClick={() => resetAddingColumn()}>x</CloseSign>
      </form>
      <Btn onClick={() => addColumn()}>Add column</Btn>
    </LiColumn>
  </>
}