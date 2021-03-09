import {
  ADD_COLUMN,
  REMOVE_COLUMN
} from './constants';

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  column
})

export const removeColumn = (id) =>  ({
  type: REMOVE_COLUMN,
  id
})