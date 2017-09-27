import { combineReducers } from "redux"
import accounts from "./accounts"
import transactions from "./transactions"
import balances from "./balances"

export default combineReducers({
  accounts,
  transactions,
  balances
});
