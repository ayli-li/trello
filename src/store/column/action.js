import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK,
  REMOVE_TASK
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
})

export const removeColumn = (id) =>  ({
  type: REMOVE_COLUMN,
  id
})

export const addTask = (task, id) => ({
  type: ADD_TASK,
  task, 
  id
})

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id
})