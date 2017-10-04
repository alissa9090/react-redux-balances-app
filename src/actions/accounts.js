export function createAccount(id, name, hidden = false) {
  return {
    type: 'CREATE_ACCOUNT',
    payload: {id, name, balance: 0, hidden}
  };
}

export function updateAccountName(id, name) {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: {id, name}
  };
}

export function hideAccount(id) {
  return {
    type: 'HIDE_ACCOUNT',
    payload: {id}
  };
}

export function deleteAccount(id) {
  return {
    type: 'DELETE_ACCOUNT',
    payload: {id}
  };
}

export function restoreAccount(id) {
  return {
    type: 'RESTORE_ACCOUNT',
    payload: {id}
  };
}
