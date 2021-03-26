import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK_ID,
  REMOVE_TASK_ID
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
})

export const removeColumn = (id) => ({
  type: REMOVE_COLUMN,
  id
})

export const addTaskIdToColumn = (taskId, columnId) => ({
  type: ADD_TASK_ID,
  taskId,
  columnId
})

export const removeTaskIdFromColumn = (taskId, columnId) => ({
  type: REMOVE_TASK_ID,
  taskId,
  columnId
})