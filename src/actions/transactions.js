export function createTransaction(id, accountId, amount, remark, date = new Date().getTime()) {
  return {
    type: "CREATE_TRANSACTION",
    payload: {id, accountId, amount, remark, date}
  }
}

export function reconcile(id, amount, remark, date = new Date().getTime()) {
  return {
    type: "CREATE_TRANSACTION",
    payload: {id, accountId: 'ADMIN', amount, remark, date}
  }
}
