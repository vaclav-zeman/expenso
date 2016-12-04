import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/';
import Config from '../Config/DebugSettings';
import R from 'ramda';
import Reactotron from 'reactotron';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersist from '../Config/ReduxPersist';
import reduxThunk from 'redux-thunk';

// the logger master switch
const USE_LOGGING = Config.reduxLogging;
// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'];
// creat the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST)),
});

const middleware = [];
middleware.push(reduxThunk);

// Don't ship these
if (__DEV__) {
  middleware.push(logger);
}

// a function which can create our store and auto-persist the data
export default () => {
  let store = {};

  // Add rehydrate enhancer if ReduxPersist is active
  if (ReduxPersist.active) {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer(),
      autoRehydrate(),
    );

    store = createStore(
      rootReducer,
      enhancers,
    );

    // configure persistStore and check reducer version number
    RehydrationServices.updateReducers(store);
  } else {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer(),
    );

    store = createStore(
      rootReducer,
      enhancers,
    );
  }

  return store;
};
