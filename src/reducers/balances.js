import {get} from 'lodash';

const balances = (state = {
  total: 0,
  accountBalances: {}
}, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallBalances = get(payload, 'balances', {});
      return {...state, ...initiallBalances}
    }
    case "CREATE_TRANSACTION": {
      const total = state.total + payload.amount;
      const accountBalance = get(state.accountBalances, payload.accountId, 0) + payload.amount;

      return {total, accountBalances: {...accountBalances, [payload.accountId]: accountBalance}}
    }
  }
  return state
}

export default balances;
