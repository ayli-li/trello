import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import './ColumnList.css';
import { CreateColumnForm } from '../CreateColumnForm/CreateColumnForm';
import { addColumn, removeColumn } from '../../store/column/action';
import { ColumnItem } from '../ColumnItem/ColumnItem';

export const ColumnList = () => {

  const [title, setTitle] = useState('');
  const [isCreateColumn, setIsCreateColumn] = useState(false);

  const dispatch = useDispatch();

  const columnList = useSelector(state => state.columns.columnList);

  const handleAddColumn = () => {
    if (title) {
      const column = {
        id: nanoid(),
        title
      }

      dispatch(addColumn(column));
      setIsCreateColumn(false);
      setTitle('');
    }
  }

  const handleResetAddingColumn = (e) => {
    if (e) {
      setIsCreateColumn(false);
    }
  }

  const handleDeleteColumnItem = (e, id) => {
    if (e) {
      console.log(columnList);
      dispatch(removeColumn(id));
    }
  }

  return <>
    <div className='columns'>
      <ul className='ul_columns'>

        { columnList.length > 0 ? 
          columnList.map(({ title, id }) => <li key={id} className='li_column'>
          <ColumnItem title={title} deleteColumn={handleDeleteColumnItem} id={id} />
        </li> ) 
        : false }

      </ul>

      {isCreateColumn && <CreateColumnForm value={title} setValue={setTitle} addColumn={handleAddColumn} resetAddingColumn={handleResetAddingColumn} /> }
    
      <button onClick={() => setIsCreateColumn(true)} className='column_btn'>
        Add column +
      </button>

    </div>     

  </>
}