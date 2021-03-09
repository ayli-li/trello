import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskDescription } from '../../store/task/action';

import './TaskModal.css';

export const TaskModal = ({ value, showModal, taskInfo, setDescription }) => {

  const [modalDescription, setModalDescription] = useState('');

  const dispatch = useDispatch();

  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  useEffect(() => {
    showModal(!clickedOutside);
  }, [clickedOutside, showModal]);

  const addDescription = (description) => {
    dispatch(addTaskDescription(description, taskInfo.id));
  }

  const handleAddDescription = () => {
    if (modalDescription) {
      setDescription(modalDescription);      
    }
    
    addDescription(modalDescription);
    setDescription('');
  };  
  
  return <div className='task_modal' ref={myRef} onClick={handleClickInside}>
      <div className='modal_header'>
        <span>MODAL WINDOW</span>
        <span className='close_symbol' onClick={() => showModal(false) }>x</span>
      </div>

      <div className='modal_content'>
        <div>{taskInfo.titleCard}</div>
        <form>
          <textarea defaultValue={value} onChange={(e) => setModalDescription(e.target.value) }></textarea>
        </form>
        <button className='column_btn' onClick={() => handleAddDescription()}>Add description</button>
      </div>
  </div>
}