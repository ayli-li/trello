import createReducer from "../../utils/createReducer";

import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION,
  CHANGE_TASKS_ORDER
} from "./constants";

const mockInitialState = [
    {
      columnId: '271ll9Q2ObqylRRmba0H9',
      id: 'xDXt_zWtr2wK2XtcX-rMM',
      titleCard: '11',
      descriptionCard: ''
    },
    {
      columnId: '271ll9Q2ObqylRRmba0H9',
      id: 'xw53DUBoi-b1st2gOe7UO',
      titleCard: '12',
      descriptionCard: ''
    },
    {
      columnId: 't8meGhNfGPUjf6Xeac428',
      id: '8LdzKkpfKEkha0rJ3WkZO',
      titleCard: '21',
      descriptionCard: ''
    },
    {
      columnId: 't8meGhNfGPUjf6Xeac428',
      id: 'DQTRCKJnAsbLhM389I9ri',
      titleCard: '22',
      descriptionCard: ''
    }
  ]

const initialState = {
  tasks: mockInitialState
}

const addTaskToColumn = (state, { task }) => ({
  ...state,
  tasks: [...state.tasks, task]
})

const removeTaskFromColumn = (state, { id }) => ({
  ...state,
  tasks: state.tasks.filter(task => task.id !== id)
})

const addTaskDescription = (state, { descriptionCard, id }) => ({
  ...state,
  tasks: state.tasks.map(task => {
    if (task.id === id) {
      return ({
        ...task,
        descriptionCard 
      })
    }
    return task;
  })
})

// const changeTasksOrder = (state, { task, currentIndex, dropIndex }) => ({
//   ...state,
//   tasks: 
// })

const strategyMap = {
  [ADD_TASK]: addTaskToColumn,
  [REMOVE_TASK]: removeTaskFromColumn,
  [ADD_DESCRIPTION]: addTaskDescription
}

const tasksReducer = createReducer(strategyMap, initialState);

export default tasksReducer;