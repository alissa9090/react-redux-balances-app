import get from 'lodash/get';
import filter from 'lodash/filter';

const transactions = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallTransactions = get(payload, 'transactions', []);
      return [...state, ...initiallTransactions];
    }
    case 'CREATE_TRANSACTION':
      return [...state, payload];
    case 'DELETE_ACCOUNT':
      return filter(state, transaction => transaction.accountId !== payload.id);
    case 'DELETE_TRANSACTIONS':
      return filter(state, transaction => !payload.transactionIdList.includes(transaction.id));
    default:
      return state;
  }
};

export default transactions;
