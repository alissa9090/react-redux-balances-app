import get from 'lodash/get';
import omit from 'lodash/omit';
import toNumber from 'lodash/toNumber';
import Big from 'big.js';

const accounts = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallAccounts = get(payload, 'accounts', {});
      return {...state, ...initiallAccounts};
    }
    case 'CREATE_ACCOUNT':
      return {...state, [payload.id]: payload};
    case 'UPDATE_ACCOUNT':
      return {...state, [payload.id]: {...state[payload.id], name: payload.name}};
    case 'HIDE_ACCOUNT':
      return {...state, [payload.id]: {...state[payload.id], hidden: true}};
    case 'RESTORE_ACCOUNT':
      return {...state, [payload.id]: {...state[payload.id], hidden: false}};
    case 'DELETE_ACCOUNT':
      return omit(state, payload.id);
    case 'CREATE_TRANSACTION': {
      const accountBalance = new Big(get(state, [payload.accountId, 'balance'], 0)).plus(payload.amount).toString();

      return {...state, [payload.accountId]: {...state[payload.accountId], balance: toNumber(accountBalance)}};
    }
    default:
      return state;
  }
};

export default accounts;
