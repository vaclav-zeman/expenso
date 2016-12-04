import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  isAdding: false,
  isLoading: false,
  data: [],
});

// Ading single transaction
const addAttempt = (state, action) =>
  state.merge({ isAdding: true });

const addSuccess = (state, action) =>
  state.merge({ isAdding: false });

const addFailure = (state, action) =>
  state.merge({ isAdding: false });

const getTransactionsAttempt = (state, action) =>
  state.merge({ isLoading: true });

const getTransactionsSuccess = (state, action) =>
  state.merge({ data: action.result, isLoading: false });

const getTransactionsFailure = (state, action) =>
  state.merge({ data: [], isLoading: false });

const ACTION_HANDLERS = {
  [Types.ADD_TRANSACTION_ATTEMPT]: addAttempt,
  [Types.ADD_TRANSACTION_SUCCESS]: addSuccess,
  [Types.ADD_TRANSACTION_FAILURE]: addFailure,
  [Types.GET_TRANSACTIONS_ATTEMPT]: getTransactionsAttempt,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
