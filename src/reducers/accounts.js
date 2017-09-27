import { get, omit, toNumber } from 'lodash';
import Big from 'big.js';

const accounts = (state = {
  ADMIN: {
    id: 'ADMIN',
    name: 'Admin',
    balance: 0,
    hidden: true
  }
}, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallAccounts = get(payload, 'accounts', {});
      return {...state, ...initiallAccounts}
    }
    case "CREATE_ACCOUNT":
      return {...state, [payload.id]: payload}
    case "UPDATE_ACCOUNT":
      return {...state, [payload.id]: {...state[payload.id], name: payload.name}}
    case "HIDE_ACCOUNT":
      return {...state, [payload.id]: {...state[payload.id], hidden: true}}
    case "RESTORE_ACCOUNT":
      return {...state, [payload.id]: {...state[payload.id], hidden: false}}
    case "DELETE_ACCOUNT":
      return omit(state, payload.id)
    case "CREATE_TRANSACTION": {
      const accountBalance = Big(get(state, [payload.accountId, 'balance'], 0)).plus(payload.amount).toString();

      return {...state, [payload.accountId]: {...state[payload.accountId], balance: toNumber(accountBalance)}}
    }
  }
  return state
}

export default accounts;
