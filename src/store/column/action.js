import {
  ADD_COLUMN,
  REMOVE_COLUMN
} from './constants';

export const addColumn = (column) => {
  return ({
    type: ADD_COLUMN,
    column
  })
}

export const removeColumn = (id) => {
  return ({
    type: REMOVE_COLUMN,
    id
  })
}