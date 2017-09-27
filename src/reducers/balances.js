import { get, toNumber } from 'lodash';
import Big from 'big.js';

const balances = (state = {
  total: 0
}, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INIT': {
      const initiallBalances = get(payload, 'balances', {});
      return {...state, ...initiallBalances}
    }
    case "CREATE_TRANSACTION": {
      const total = Big(state.total).plus(payload.amount).toString();
      return {total: toNumber(total)};
    }
  }
  return state
}

export default balances;
