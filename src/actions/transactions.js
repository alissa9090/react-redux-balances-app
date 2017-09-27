import localforage from 'localforage';
const INDEX_DB_KEY = 'ReactReduxBalanceApp';

export const createTransaction = (id, accountId, amount, date = new Date().getTime()) => (dispatch, getState) => {
  dispatch({
    type: "CREATE_TRANSACTION",
    payload: {id, accountId, amount, date}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}

export const deleteTransactions = (transactionIdList) => (dispatch, getState) => {
  dispatch({
    type: "DELETE_TRANSACTIONS",
    payload: {transactionIdList}
  });
  localforage.setItem(INDEX_DB_KEY, getState());
}
