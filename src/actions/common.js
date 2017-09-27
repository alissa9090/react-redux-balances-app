import localforage from 'localforage';
const INDEX_DB_KEY = 'ReactReduxBalanceApp';

export const init = (payload) => (dispatch, getState) => {
  dispatch({
    type: "INIT",
    payload
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}