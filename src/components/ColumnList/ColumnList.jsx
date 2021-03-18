import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import './ColumnList.css';
import { CreateColumnForm } from '../CreateColumnForm/CreateColumnForm';
import { addColumn, removeColumn, changeColumnOrder } from '../../store/column/action';
import { ColumnItem } from '../ColumnItem/ColumnItem';

export const ColumnList = () => {

  const [title, setTitle] = useState('');
  const [columnOrder, setColumnOrder] = useState(0);
  const [isCreateColumn, setIsCreateColumn] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);

  const dispatch = useDispatch();

  const columnList = useSelector(state => state.columns.columnList);

  const handleAddColumn = () => {
    if (title) {
      const column = {
        id: nanoid(),
        columnOrder,
        title
      }

      dispatch(addColumn(column));
      setColumnOrder(prev => prev + 1);
      setIsCreateColumn(false);
      setTitle('');
    }
  }

  const handleResetAddingColumn = () => setIsCreateColumn(false);

  const handleDeleteColumnItem = (id) => dispatch(removeColumn(id));

  const dragStartHanlder = (e, column) => {
    setCurrentColumn(column);
  }

  const dragEndHandler = (e) => {
  }
  
  const dragOverHandler = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e, column) => {
    e.preventDefault();
    dispatch(changeColumnOrder(column, currentColumn)); 
  }

  const sortColumns = (a, b) => a.columnOrder - b.columnOrder;

  return <>
    <div className='columns'>
      <ul className='ul_columns'>

        { columnList.length ?
          columnList.sort(sortColumns).map(column => 
          <li key={column.id} 
              className='li_column'>

            <ColumnItem 
              title={column.title} 
              deleteColumn={handleDeleteColumnItem} 
              id={column.id} 
              column={column}
              onDragStart={(e) => dragStartHanlder(e, column)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, column)}
              draggable={true} />
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