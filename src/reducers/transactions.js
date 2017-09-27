import {get} from 'lodash';

const transactions = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallTransactions = get(payload, 'transactions', []);
      return [...state, ...initiallTransactions]
    }
    case "CREATE_TRANSACTION":
      return [...state, payload]
  }
  return state
}

export default transactions;
