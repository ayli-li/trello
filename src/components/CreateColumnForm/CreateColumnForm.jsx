import React from 'react';

import './CreateColumnForm.css';

export const CreateColumnForm = ({ value, setValue, addColumn, resetAddingColumn }) => {
  return <>
    <li className='li_column'>
      <form className='column_items'> 
        <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        <span className='close_symbol' onClick={() => resetAddingColumn()}>x</span>
      </form>
      <button className='column_btn column_item-btn' onClick={() => addColumn()}>Add column</button>
    </li>
  </>
}