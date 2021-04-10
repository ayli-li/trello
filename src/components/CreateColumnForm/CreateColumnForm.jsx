import React from 'react';

import { ColumnCreator, ColumnForm, ColumnTitleInput } from './CreateColumnFormStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
import { Btn } from '../ColumnList/ColumnListStyled.js';

export const CreateColumnForm = ({ value, setValue, addColumn, addColumnByEnter, resetAddingColumn }) => {

  const handlePreventEvent = (e) => {
    e.preventDefault();
  }

  return <>
    <ColumnCreator>

      <ColumnForm onSubmit={handlePreventEvent}> 

        <ColumnTitleInput value={value} onChange={(e) => setValue(e.target.value)} />
        <CloseSign onClick={() => resetAddingColumn()}>&times;</CloseSign>

      </ColumnForm>

      <Btn onClick={() => addColumn()}>Add column</Btn>

    </ColumnCreator>
  </>
}