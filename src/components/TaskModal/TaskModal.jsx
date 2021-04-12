import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addTaskDescription, renameTaskInModal } from '../../store/task/action';

import { ModalOverlay, ModalWindow, ModalHeader, ModalTitle, ModalFormContent, ModalForm, ModalDescription, DescriptionValue } from './TaskModalStyled.js';
import { CloseSign } from '../ColumnItem/ColumnItemStyled.js';
import { ColumnTitleInput } from '../CreateColumnForm/CreateColumnFormStyled.js';
import { TaskTextarea } from '../CreateTaskForm/CreateTaskFormStyled.js';
import { Btn } from '../ColumnList/ColumnListStyled.js';

export const TaskModal = ({ value, showModal, description, id, columnId, deleteTask }) => {

  const [showTaskValueInput, setShowTaskValueInput] = useState(false);
  const [showTaskValue, setShowTaskValue] = useState(true);
  const [taskValueInput, setTaskValueInput] = useState(value);
  const [showModalForm, setShowModalForm] = useState(true);
  const [modalDescription, setModalDescription] = useState(description);  

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

  useEffect(() => {
    if (description) {
      setShowModalForm(false);
    }
  }, [description,setShowModalForm]);

  const addDescription = () => {
    if (modalDescription) {
      dispatch(addTaskDescription(modalDescription, id));
      setShowModalForm(false);
    }           
  }

  const renameTask = (e) => {
    e.preventDefault();

    if (taskValueInput) {
      dispatch(renameTaskInModal(id, taskValueInput));
      setShowTaskValue(true);
      setShowTaskValueInput(false);
    }
  }

  const handleDeleteTask = () => {
    deleteTask(id, columnId);
    showModal(false);
  }

  const handleSubmit = () => {
    if (modalDescription) {
      dispatch(addTaskDescription(modalDescription, id));
      setShowModalForm(false);
    }     
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleShowValue = () => {
    setShowTaskValue(false);
    setShowTaskValueInput(true);
  }

  return <>
    <ModalOverlay />

    <ModalWindow ref={myRef} onClick={handleClickInside}>

      <ModalHeader>

        {showTaskValue && 
          <ModalTitle onDoubleClick={handleShowValue}>
            {value}
          </ModalTitle> }

        {showTaskValueInput && 
          <form onSubmit={(e) => renameTask(e)}>
            <ColumnTitleInput onChange={(e) => setTaskValueInput(e.target.value)} value={taskValueInput}/>
          </form> }

        <CloseSign className='close_symbol' onClick={() => showModal(false) }>&times;</CloseSign>

      </ModalHeader>

      {showModalForm && 

        <ModalFormContent>
          <ModalForm onSubmit={handleSubmit}>

            <TaskTextarea
              modalTextarea
              rows={3}
              cols={30}               
              onChange={(e) => setModalDescription(e.target.value) }
              onKeyDown={(e) => onEnterPress(e)}
              placeholder="Input task's description"
              value={modalDescription} />          

          </ModalForm>

          <Btn onClick={addDescription}>Add description</Btn>

        </ModalFormContent> }

      {description && !showModalForm &&

        <ModalDescription>

          Description: 
          <DescriptionValue onDoubleClick={() => setShowModalForm(true) } >
            {description}
          </DescriptionValue>

        </ModalDescription> }

      <Btn deleteTask onClick={handleDeleteTask}>Delete task</Btn>

    </ModalWindow>
  </>
}