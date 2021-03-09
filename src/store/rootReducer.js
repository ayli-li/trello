import { combineReducers } from 'redux';
import columnReducer from './column/reducer';
import tasksReducer from './task/reducer';

const rootReducer = combineReducers({
  columns: columnReducer, 
  tasks: tasksReducer
 });

export default rootReducer;