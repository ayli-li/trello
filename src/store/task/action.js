import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION
} from './constants';

export const addTask = (task, taskNumber) => ({
  type: ADD_TASK,
  task,
  taskNumber
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id
});

export const addTaskDescription = (descriptionCard, id) => ({
  type: ADD_DESCRIPTION,
  descriptionCard,
  id
});