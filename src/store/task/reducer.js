import createReducer from "../../utils/createReducer";

import {
  ADD_TASK,
  REMOVE_TASK,
  ADD_DESCRIPTION,
  RENAME_TASK
} from "./constants";

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