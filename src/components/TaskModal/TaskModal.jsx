import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addTaskDescription } from '../../store/task/action';

import { ModalOverlay, ModalWindow, ModalHeader, ModalTitle, ModalContent } from './TaskModalStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
import { TaskTextarea } from '../CreateTaskForm/CreateTaskFormStyled.js';
import { Btn } from '../ColumnList/ColumnListStyled.js';

export const TaskModal = ({ value, showModal, description, id }) => {

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

  const addDescription = () => {
    dispatch(addTaskDescription(modalDescription, id));
  } 

  return <>
    <ModalOverlay />

    <ModalWindow ref={myRef} onClick={handleClickInside}>

      <ModalHeader>
        <ModalTitle>Task {value}</ModalTitle>
        <CloseSign className='close_symbol' onClick={() => showModal(false) }>&times;</CloseSign>
      </ModalHeader>

      <ModalContent>

        {!description && <>
          <form>
            <TaskTextarea
              modalTextarea
              rows={3}
              cols={23}               
              onChange={(e) => setModalDescription(e.target.value) }
              placeholder="Input task's description" />
          </form>
          
          <Btn className='column_btn' onClick={addDescription}>Add description</Btn>
        </> }

        {description && <div>{description}</div>}
        
      </ModalContent>

    </ModalWindow>
  </>
}