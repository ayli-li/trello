import { 
  ADD_COLUMN_ORDER,
  REMOVE_COLUMN_ORDER,
  SWITCH_COLUMN_ORDER
 } from "./constants";

export const addColumnOrder = (columnId) => ({
  type: ADD_COLUMN_ORDER,
  columnId
});

export const removeColumnOrder = (columnId) => ({
  type: REMOVE_COLUMN_ORDER,
  columnId
});

export const switchColumnOrder = (newOrder) => ({
  type: SWITCH_COLUMN_ORDER,
  newOrder
});