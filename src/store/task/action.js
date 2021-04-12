import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION,
  RENAME_TASK
} from './constants';

export const addTask = (task) => ({
  type: ADD_TASK,
  task
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

export const renameTaskInModal = (id, value) => ({
  type: RENAME_TASK,
  id,
  value
});