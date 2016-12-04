import Types from '../Actions/Types';
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  notification: {
    text: '',
    theme: '',
  },
  storeLoaded: false,
});

const toggleNotification = (state, action) =>
  state.merge({
    notification: {
      text: action.message,
      theme: action.theme,
    },
  });

const storeLoaded = state =>
  state.merge({ storeLoaded: true });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.NOTIFICATION]: toggleNotification,
  [Types.STORE_LOADED]: storeLoaded,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
