import createReducer from "../../utils/createReducer"
import {
  ADD_COLUMN, 
  REMOVE_COLUMN,
  ADD_TASK
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

const addTaskToColumn = (state, { task }) => ({
  ...state,
  columnList: state.columnList.map(column => ({
    ...column,
    tasks: [...column.tasks, task]
  })
)})

const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList,
  [ADD_TASK]: addTaskToColumn,
}

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;