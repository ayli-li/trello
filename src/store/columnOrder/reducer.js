import createReducer from "../../utils/createReducer";

import { 
  ADD_COLUMN_ORDER,
  REMOVE_COLUMN_ORDER,
  SWITCH_COLUMN_ORDER
 } from "./constants";

const initialState = {
  columnOrder: []
};

const addColumnOrder = (state, { columnId }) => ({
  ...state,
  columnOrder: [...state.columnOrder, columnId],
});

const removeColumnOrder = (state, { columnId }) => ({
  ...state,
  columnOrder: state.columnOrder.filter(id => id !== columnId),
});

const switchColumnOrder = (state, { newOrder }) => ({
  ...state,
  columnOrder: newOrder,
});

const strategyMap = {
  [ADD_COLUMN_ORDER]: addColumnOrder,
  [REMOVE_COLUMN_ORDER]: removeColumnOrder,
  [SWITCH_COLUMN_ORDER]: switchColumnOrder,
};

const columnOrderReducer = createReducer(strategyMap, initialState);

export default columnOrderReducer;