import { get, omit } from 'lodash';

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
  }
  return state
}

export default accounts;
