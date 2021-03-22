import createReducer from "../../utils/createReducer"
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK_ID,
  REMOVE_TASK_ID
} from "./constants"

// const mockInitialState = [
//   {
//     id: '271ll9Q2ObqylRRmba0H9',
//     columnOrder: 1,
//     title: '1'
//   },
//   {
//     id: 't8meGhNfGPUjf6Xeac428',
//     columnOrder: 2,
//     title: '2'
//   }
// ]

const initialState = {
  columnList: {},
}

const updateColumnList = (state, { column, id }) => ({
  ...state,
  columnList: {...state.columnList, [id]: column}  
})

const removeItemFromColumnList = (state, { id }) => {
  for (let key in state.columnList) {  

    if (state.columnList[key].id === id) {
      delete state.columnList[key];
    } 
  }

  return {
    ...state,
    columnList: {...state.columnList}
  }
}

const addTaskIdToColumn = (state, { taskId, columnId }) => {

  // for (let key in state.columnList) {

  //   if (state.columnList[key].id === columnId) {
  //     state.columnList[key].taskIds.push(taskId);
  //   }
  // }

  console.log('columnId', columnId)
  console.log('taskId', taskId)

  return {
    ...state,
    columnList: {
      ...state.columnList,
      [columnId]: {
        ...state.columnList[columnId],
        taskIds: [...state.columnList[columnId].taskIds, taskId]
      }
    } 
  }
}

const removeTaskIdFromColumn = (state, { taskId, columnId }) => {
  for (let key in state.columnList) {

    if (state.columnList[key].id === columnId) {
      const index = state.columnList[key].taskIds.indexOf(taskId);
      state.columnList[key].taskIds.splice(index, 1);
    }
  }

  return {
    ...state,
    columnList: {...state.columnList}
  }
}


const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList,
  [ADD_TASK_ID]: addTaskIdToColumn,
  [REMOVE_TASK_ID]: removeTaskIdFromColumn
}

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;