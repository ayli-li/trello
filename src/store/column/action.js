import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
})

export const removeColumn = (id) =>  ({
  type: REMOVE_COLUMN,
  id
})

export const addTask = (task) => ({
  type: ADD_TASK,
  task
})