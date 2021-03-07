import React from 'react';

export const CreateTaskForm = ({ value, setValue, resetAddingTask }) => {
  return <div>
    <form>
      <textarea rows={5} cols={30} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Input title card" />
      <span className='close_symbol' onClick={() => resetAddingTask()}>x</span>    
    </form>
  </div>
}