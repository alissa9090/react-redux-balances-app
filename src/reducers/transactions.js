import {get, filter, find} from 'lodash';

const transactions = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallTransactions = get(payload, 'transactions', []);
      return [...state, ...initiallTransactions]
    }
    case "CREATE_TRANSACTION":
      return [...state, payload]
    case "UPDATE_TRANSACTION": {
      const transcationToUpdate = find(state, transaction => transaction.id !== payload.id)
      return [...filter(state, transaction => transaction.id !== payload.id), {...transcationToUpdate, ...payload}] 
    }
    case "DELETE_ACCOUNT":
      return filter(state, transaction => transaction.accountId !== payload.id)
  }
  return state
}

export default transactions;
