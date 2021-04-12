import createReducer from "../../utils/createReducer";

import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION,
  RENAME_TASK
} from "./constants";

// const mockInitialState = [
//     {
//       columnId: '271ll9Q2ObqylRRmba0H9',
//       id: 'xDXt_zWtr2wK2XtcX-rMM',
//       titleCard: '11',
//       descriptionCard: ''
//     },
//     {
//       columnId: '271ll9Q2ObqylRRmba0H9',
//       id: 'xw53DUBoi-b1st2gOe7UO',
//       titleCard: '12',
//       descriptionCard: ''
//     },
//     {
//       columnId: 't8meGhNfGPUjf6Xeac428',
//       id: '8LdzKkpfKEkha0rJ3WkZO',
//       titleCard: '21',
//       descriptionCard: ''
//     },
//     {
//       columnId: 't8meGhNfGPUjf6Xeac428',
//       id: 'DQTRCKJnAsbLhM389I9ri',
//       titleCard: '22',
//       descriptionCard: ''
//     }
//   ]

const initialState = {
  tasks: {}
};

const addTaskToColumn = (state, { task }) => ({
  ...state,
  tasks: {...state.tasks, [task.id]: task}
});

const removeTaskFromColumn = (state, { id }) => {
  delete state.tasks[id];

  return {
    ...state,
    tasks: {...state.tasks}
  }
};

const addTaskDescription = (state, { descriptionCard, id }) => ({
  ...state,
  tasks: {
    ...state.tasks,
    [id]: {
      ...state.tasks[id],
      descriptionCard
    }
  }
});

const renameTaskInModal = (state, { id, value }) => ({
  ...state,
  tasks: {
    ...state.tasks,
    [id]: {
      ...state.tasks[id],
      titleCard: value
    }
  }
});

const strategyMap = {
  [ADD_TASK]: addTaskToColumn,
  [REMOVE_TASK]: removeTaskFromColumn,
  [ADD_DESCRIPTION]: addTaskDescription,
  [RENAME_TASK]: renameTaskInModal
};

const tasksReducer = createReducer(strategyMap, initialState);

export default tasksReducer;