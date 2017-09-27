export function createTransaction(id, accountId, amount, date = new Date().getTime()) {
  return {
    type: "CREATE_TRANSACTION",
    payload: {id, accountId, amount, date}
  }
}

export function updateTransaction(id, accountId, amount, date = new Date().getTime()) {
  return {
    type: "UPDATE_TRANSACTION",
    payload: {id, accountId, amount, date}
  }
}

export function reconcile(id, amount, date = new Date().getTime()) {
  return {
    type: "CREATE_TRANSACTION",
    payload: {id, accountId: 'ADMIN', amount, date}
  }
}
