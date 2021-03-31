import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK_ID,
  REMOVE_TASK_ID,
  SWITCH_TASKS_ORDER_IN_THE_SAME_COLUMN,
  SWITCH_TASKS_ORDER_IN_THE_DIFFERENT_COLUMNS
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
});

export const removeColumn = (id) => ({
  type: REMOVE_COLUMN,
  id
});

export const addTaskIdToColumn = (taskId, columnId) => ({
  type: ADD_TASK_ID,
  taskId,
  columnId
});

export const removeTaskIdFromColumn = (taskId, columnId) => ({
  type: REMOVE_TASK_ID,
  taskId,
  columnId
});

export const switchTasksOrderInTheSameColumn = (column) => ({
  type: SWITCH_TASKS_ORDER_IN_THE_SAME_COLUMN,
  column
});

export const switchTasksOrderInTheDifferentColumns = (startColumn, finishColumn) => ({
  type: SWITCH_TASKS_ORDER_IN_THE_DIFFERENT_COLUMNS,
  startColumn,
  finishColumn
})