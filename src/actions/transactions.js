export function createTransaction(id, accountId, amount, date = new Date().getTime()) {
  return {
    type: "CREATE_TRANSACTION",
    payload: {id, accountId, amount, date}
  }
}
