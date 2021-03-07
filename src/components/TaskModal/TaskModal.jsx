import React from 'react';

import './TaskModal.css';

export const TaskModal = ({ showModal }) => {

    const handleCloseModalClick = (e) => {
      console.log(e.target.className)
    if (e.target.className !== 'task_modal') {
      showModal(false);
    }
  }
  
  return <div className='task_modal' onClick={(e) => handleCloseModalClick(e)}>
    MODAL WINDOW
    <span className='close_symbol' onClick={() => showModal(false) }>x</span>
  </div>
}