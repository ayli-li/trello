import createReducer from "../../utils/createReducer"
import {
  ADD_COLUMN, 
  REMOVE_COLUMN
} from "./constants"

const initialState = {
  columnList: [],
}

const updateColumnList = (state, { column }) => ({
  ...state,
  columnList: [...state.columnList, column],
})

const removeItemFromColumnList = (state, { id }) => ({
  ...state,
  columnList: state.columnList.filter(item => item.id !== id)
})

const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList
}

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;