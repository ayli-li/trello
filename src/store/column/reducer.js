import createReducer from "../../utils/createReducer";
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_TASK_ID,
  REMOVE_TASK_ID,
  SWITCH_TASKS_ORDER_IN_THE_SAME_COLUMN,
  SWITCH_TASKS_ORDER_IN_THE_DIFFERENT_COLUMNS,
  RENAME_COLUMN
} from "./constants";

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
};

const updateColumnList = (state, { column }) => ({
  ...state,
  columnList: {...state.columnList, [column.id]: column}  
});

const removeItemFromColumnList = (state, { id }) => {
  delete state.columnList[id];

  return {
    ...state,
    columnList: {...state.columnList}
  }
};

const addTaskIdToColumn = (state, { taskId, columnId }) => ({
  ...state,
  columnList: {
    ...state.columnList,
    [columnId]: {
      ...state.columnList[columnId],
      taskIds: [...state.columnList[columnId].taskIds, taskId]
    }
  } 
});

const removeTaskIdFromColumn = (state, { taskId, columnId }) => ({
  ...state,
  columnList: {
    ...state.columnList,
    [columnId]: {
      ...state.columnList[columnId],
      taskIds: [...state.columnList[columnId].taskIds.filter(id => id !== taskId)]
    }
  }
});

const switchTasksOrderInTheSameColumn = (state, { column }) => ({
  ...state,
  columnList: {
    ...state.columnList,
    [column.id]: column,
  }
});

const switchTasksOrderInTheDifferentColumns = (state, { startColumn, finishColumn }) => ({
  ...state,
  columnList: {
    ...state.columnList,
    [startColumn.id]: startColumn,
    [finishColumn.id]: finishColumn,
  }
});

const renameColumnTitle = (state, { id, title }) => ({
  ...state,
  columnList: {
    ...state.columnList,
    [id]: {
      ...state.columnList[id],
      title
    }
  }
})


const strategyMap = {
  [ADD_COLUMN]: updateColumnList,
  [REMOVE_COLUMN]: removeItemFromColumnList,
  [ADD_TASK_ID]: addTaskIdToColumn,
  [REMOVE_TASK_ID]: removeTaskIdFromColumn,
  [SWITCH_TASKS_ORDER_IN_THE_SAME_COLUMN]: switchTasksOrderInTheSameColumn,
  [SWITCH_TASKS_ORDER_IN_THE_DIFFERENT_COLUMNS]: switchTasksOrderInTheDifferentColumns,
  [RENAME_COLUMN]: renameColumnTitle
};

const columnReducer = createReducer(strategyMap, initialState);

export default columnReducer;