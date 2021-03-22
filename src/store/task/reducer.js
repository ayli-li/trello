import createReducer from "../../utils/createReducer";

import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION
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
}

const addTaskToColumn = (state, { task, taskNumber }) => ({
  ...state,
  tasks: {...state.tasks, [taskNumber]: task}
})

const removeTaskFromColumn = (state, { id }) => {
  for (let key in state.tasks) {  

    if (state.tasks[key].id === id) {
      delete state.tasks[key];
    } 
  }

  return {
    ...state,
    tasks: {...state.tasks}
  }
}

const addTaskDescription = (state, { descriptionCard, id }) => {
  for (let key in state.tasks) {  

    if (state.tasks[key].id === id) {
      state.tasks[key].descriptionCard = descriptionCard;
    } 
  }

  return {
    ...state,
    tasks: {...state.tasks}
  }
  // ...state,
  // tasks: state.tasks.map(task => {
  //   if (task.id === id) {
  //     return ({
  //       ...task,
  //       descriptionCard 
  //     })
  //   }
  //   return task;
  // })
}

const strategyMap = {
  [ADD_TASK]: addTaskToColumn,
  [REMOVE_TASK]: removeTaskFromColumn,
  [ADD_DESCRIPTION]: addTaskDescription,
}

const tasksReducer = createReducer(strategyMap, initialState);

export default tasksReducer;