import { combineReducers } from 'redux';
import TransactionReducer from './TransactionReducer';
import LoginReducer from './LoginReducer';
import UIReducer from './UIReducer';

// glue all the reducers together into 1 root reducer
export default combineReducers({
  transactions: TransactionReducer,
  login: LoginReducer,
  ui: UIReducer,
});

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['transactions', 'ui'];
