import React from 'react';

export const CreateTaskForm = ({ value, setValue }) => {
  return <div>
    <form>
      <textarea rows={5} cols={30} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Input title card" />    
    </form>
  </div>
}