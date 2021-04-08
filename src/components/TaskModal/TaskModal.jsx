import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addTaskDescription } from '../../store/task/action';
import { CloseSign } from '../ColumnItem/ColumnItem';
import { Btn } from '../ColumnList/ColumnList';

import './TaskModal.css';

const ModalWindow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  min-width: 500px;
  background-color: gray;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;


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
  
  return <ModalWindow ref={myRef} onClick={handleClickInside}>
      <ModalHeader>
        <span>MODAL WINDOW</span>
        <CloseSign className='close_symbol' onClick={() => showModal(false) }>x</CloseSign>
      </ModalHeader>

      <ModalContent>
        <div>{taskInfo.titleCard}</div>
        <form>
          <textarea defaultValue={value} onChange={(e) => setModalDescription(e.target.value) }></textarea>
        </form>
        <Btn className='column_btn' onClick={() => handleAddDescription()}>Add description</Btn>
      </ModalContent>
  </ModalWindow>
}