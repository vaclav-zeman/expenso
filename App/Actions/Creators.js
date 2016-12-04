import Types from './Types';
import { firebaseAuth, firebaseDb } from '../Lib/Firebase';
import moment from 'moment';

const login = (email, password) =>
   (dispatch) => {
     dispatch(attemptLogin(email, password));
     return firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch(loginSuccess(email, res.uid));
        dispatch(showNotification('You were successfully logged in!', 'success'));
      })
      .catch((err) => {
        dispatch(loginFailure(err));
        dispatch(showNotification('We were unable to log you in.'));
      });
   }
;

const attemptLogin = (email, password) =>
  ({ type: Types.LOGIN_ATTEMPT, email, password });

const loginSuccess = (email, uid) =>
  ({ type: Types.LOGIN_SUCCESS, email, uid });

const loginFailure = errorCode =>
  ({ type: Types.LOGIN_FAILURE, errorCode });

const logout = () => ({ type: Types.LOGOUT });

const startup = () => ({ type: Types.STARTUP });


// Notifications
const notification = (message, theme) =>
  ({ type: Types.NOTIFICATION, message, theme });

const showNotification = (msg, theme = 'error') =>
   (dispatch) => {
     dispatch(notification(msg, theme));
    // clear notification after 5s
     setTimeout(() =>
      dispatch(notification('', '')), 5000,
    );
   }
;

// Transactions
const addTransactionAttempt = transaction => ({
  type: Types.ADD_TRANSACTION_ATTEMPT,
  transaction,
});

const addTransactionSuccess = () => ({
  type: Types.ADD_TRANSACTION_SUCCESS,
});

const addTransactionFailure = () => ({
  type: Types.ADD_TRANSACTION_FAILURE,
});

const addTransaction = (transaction, uid) =>
   (dispatch) => {
     dispatch(addTransactionAttempt());
     return firebaseDb.child(`transactions/${uid}/`)
      .push(transaction)
      .then((res) => {
        dispatch(addTransactionSuccess());
      })
      .catch((err) => {
        dispatch(addTransactionFailure());
        console.debug(err);
      });
   }
;

/*
  Beware: if you are looking at this in the future and you're willing to list time in the lists:
  moment.startOf returns start of month as last day of the previous month at about 10 PM
*/
const getTransactions = (uid, month, year, limit = 200) => {
  if (!month) month = moment().format('M'); // returns regular month number => Sept = 9
  if (!year) year = moment().format('Y');

  // Unix treats months as => Sept = 8 => so month -1
  const startDate = moment([year, month - 1]).startOf('month').unix();
  const endDate = moment([year, month - 1]).endOf('month').unix();

  return (dispatch) => {
    dispatch({ type: Types.GET_TRANSACTIONS_ATTEMPT, month });
    const result = [];
    firebaseDb
      .child(`transactions/${uid}/`)
      .orderByChild('date')
      .startAt(startDate)
      .endAt(endDate)
      .on('value', (snap) => {
        if (!snap.val()) {
          return dispatch({
            type: Types.GET_TRANSACTIONS_FAILURE,
          });
        }
        const res = snap.val();
        Object.keys(res).map((item, index) => {
          result.push(res[item]);
        });

        dispatch({
          type: Types.GET_TRANSACTIONS_SUCCESS,
          result,
        });
      });
  };
};

const deleteTransaction = (id, uid) =>
   (dispatch) => {
     dispatch({ type: Types.DELETE_TRANSACTION_ATTEMPT, id });
     console.log(id, uid);
     return firebaseDb
      .child(`transactions/${uid}/`)
      .orderByChild('id')
      .equalTo(id)
      .once('child_added', (snap) => {
        snap.ref.remove((error) => {
          if (error) {
            console.debug(error);
            dispatch({ type: Types.DELETE_TRANSACTION_FAILURE });
          } else {
            dispatch({ type: Types.DELETE_TRANSACTION_SUCCESS, id });
          }
        });
      });
   }
;

/**
 Makes available all the action creators we've created.
 */
export default {
  login,
  logout,
  startup,
  showNotification,
  addTransaction,
  getTransactions,
  deleteTransaction,
};
