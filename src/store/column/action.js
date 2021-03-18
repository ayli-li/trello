import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_ORDER
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
})

export const removeColumn = (id) => ({
  type: REMOVE_COLUMN,
  id
})

export const changeColumnOrder = (column, currentColumn) => ({
  type: CHANGE_COLUMN_ORDER,
  column,
  currentColumn
})