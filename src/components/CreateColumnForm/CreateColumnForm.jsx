import React from 'react';

import { ColumnCreator, ColumnForm, ColumnTitleInput } from './CreateColumnFormStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
import { Btn } from '../ColumnList/ColumnListStyled.js';

export const CreateColumnForm = ({ value, setValue, addColumn, resetAddingColumn }) => {

  const handleSubmit = (e) => {
    addColumn();
    e.preventDefault();
  }

  return <>
    <ColumnCreator>

      <ColumnForm onSubmit={(e) => handleSubmit(e)}> 

        <ColumnTitleInput value={value} onChange={(e) => setValue(e.target.value)} />
        <CloseSign onClick={() => resetAddingColumn()}>&times;</CloseSign>

      </ColumnForm>

      <Btn onClick={() => addColumn()}>Add column</Btn>

    </ColumnCreator>
  </>
}