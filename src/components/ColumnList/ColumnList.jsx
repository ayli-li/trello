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

  const handleResetAddingColumn = () => setIsCreateColumn(false);

  const handleDeleteColumnItem = (id) => dispatch(removeColumn(id));

  return <>
    <div className='columns'>
      <ul className='ul_columns'>

        { columnList.length ? 
          columnList.map(column => <li key={column.id} className='li_column'>
          <ColumnItem title={column.title} deleteColumn={handleDeleteColumnItem} id={column.id} column={column} />
        </li> ) 
        : false }

      </ul>

      {isCreateColumn && <CreateColumnForm value={title} setValue={setTitle} addColumn={handleAddColumn} 
      resetAddingColumn={handleResetAddingColumn} /> }
    
      {!isCreateColumn && <button onClick={() => setIsCreateColumn(true)} className='column_btn'>
        Add column +
      </button>}

    </div>     

  </>
}