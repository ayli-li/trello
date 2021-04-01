import { combineReducers } from 'redux';
import columnReducer from './column/reducer';
import tasksReducer from './task/reducer';
import columnOrderReducer from './columnOrder/reducer';

const rootReducer = combineReducers({
  columns: columnReducer, 
  tasks: tasksReducer,
  columnOrder: columnOrderReducer
 });

export default rootReducer;