import createReducer from "../../utils/createReducer"
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_ORDER
} from "./constants"

const mockInitialState = [
  {
    id: '271ll9Q2ObqylRRmba0H9',
    columnOrder: 1,
    title: '1'
  },
  {
    id: 't8meGhNfGPUjf6Xeac428',
    columnOrder: 2,
    title: '2'
  }
]

const initialState = {
  columnList: mockInitialState,
}

const updateColumnList = (state, { column }) => ({
  ...state,
  columnList: [...state.columnList, column],
})

const removeItemFromColumnList = (state, { id }) => ({
  ...state,
  columnList: state.columnList.filter(column => column.id !== id)
})

const changeColumnOrder = (state, { column, currentColumn }) => ({
  ...state,
  columnList: state.columnList.map(item => {
    if (item.id === column.id) {
      return {...item, columnOrder: currentColumn.columnOrder};
    }
    if (item.id === currentColumn.id) {
      return {...item, columnOrder: column.columnOrder};
    }
    return item;
  })
})

const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList,
  [CHANGE_COLUMN_ORDER]: changeColumnOrder
}

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;