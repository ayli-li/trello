import createReducer from "../../utils/createReducer";

import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION,
  CHANGE_TASKS_ORDER
} from "./constants";

const initialState = {
  tasks: []
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