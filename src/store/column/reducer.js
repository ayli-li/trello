import createReducer from "../../utils/createReducer"
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK,
  REMOVE_TASK
} from "./constants"

const initialState = {
  columnList: [],
}

const updateColumnList = (state, { column }) => ({
  ...state,
  columnList: [...state.columnList, column],
})

const removeItemFromColumnList = (state, {
  id
}) => ({
  ...state,
  columnList: state.columnList.filter(column => column.id !== id)
})

const addTaskToColumn = (state, {
  task,
  id
}) => {
  return {
    ...state,
    columnList: state.columnList.map(column => {
      if (column.id === id) {
        return ({
          ...column,
          tasks: [...column.tasks, task]
        })
      }

      return column;
    })
  }
}

const removeTaskFromColumn = (state, {
  id
}) => ({
  ...state,
  columnList: state.columnList.map(column => ({
    ...column,
    tasks: [...column.tasks.filter(task => task.id !== id)]
  }))
})

const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList,
  [ADD_TASK]: addTaskToColumn,
  [REMOVE_TASK]: removeTaskFromColumn
}

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;