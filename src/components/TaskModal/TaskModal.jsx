import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addTaskDescription } from '../../store/task/action';
import { CloseSign } from '../ColumnItem/ColumnItem';
import { Btn } from '../ColumnList/ColumnList';

import './TaskModal.css';

const ModalOverlay = styled.div`
  position: fixed;
  background-color: gray;
  opacity: .7;
  height: 100%;
  inset: 0;
`;

const ModalWindow = styled.div`
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  max-width: 350px;
  width: 100%;
  border: 0.5px solid lightgray;
  background-color: white;
  z-index: 1;
  padding: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const ModalTitle = styled.span`
  font-weight: 500;
  flex-grow: 2;
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const ModalTextarea = styled.textarea`
  resize: none;
  color: #172b4d;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

  return <>
  <ModalOverlay />

  <ModalWindow ref={myRef} onClick={handleClickInside}>
    <ModalHeader>
      <ModalTitle>Task {taskInfo.titleCard}</ModalTitle>
      <CloseSign className='close_symbol' onClick={() => showModal(false) }>&times;</CloseSign>
    </ModalHeader>

    <ModalContent>

      {!taskInfo.descriptionCard && <>
        <form>
          <ModalTextarea defaultValue={value} onChange={(e) => setModalDescription(e.target.value) } />
        </form>
        <Btn className='column_btn' onClick={handleAddDescription}>Add description</Btn>
      </> }

      {taskInfo.descriptionCard && <div>{taskInfo.descriptionCard}</div>}
      
    </ModalContent>
  </ModalWindow>
</>
}