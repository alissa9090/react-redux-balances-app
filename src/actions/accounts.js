import localforage from 'localforage';
const INDEX_DB_KEY = 'ReactReduxBalanceApp';

export const createAccount = (id, name, hidden = false) => (dispatch, getState) => {
  dispatch({
    type: "CREATE_ACCOUNT",
    payload: {id, name, balance: 0, hidden}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}

export const updateAccountName = (id, name) => (dispatch, getState) => {
  dispatch({
    type: "UPDATE_ACCOUNT",
    payload: {id, name}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}

export const hideAccount = (id) => (dispatch, getState) => {
  dispatch({
    type: "HIDE_ACCOUNT",
    payload: {id}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}

export const deleteAccount = (id) => (dispatch, getState) => {
  dispatch({
    type: "DELETE_ACCOUNT",
    payload: {id}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}

export const restoreAccount = (id) => (dispatch, getState) => {
  dispatch({
    type: "RESTORE_ACCOUNT",
    payload: {id}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}
