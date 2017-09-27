import React, {PureComponent} from 'react';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import localforage from 'localforage';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from "./reducers"
import { init } from './actions/common';
import AccountList from './screens/AccountList';
import AccountForm from './screens/AccountForm';
import TransactionList from './screens/TransactionList';
import TransactionForm from './screens/TransactionForm';

const INDEX_DB_KEY = 'ReactReduxBalanceApp';

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    const middleware = composeWithDevTools(applyMiddleware(thunk));
    this.store = createStore(reducer, middleware);
  }
  async componentDidMount() {
    await localforage.setDriver([
      localforage.INDEXEDDB
    ])
    const state = await localforage.getItem(INDEX_DB_KEY);
    this.store.dispatch(init(state));

    window.addEventListener('beforeunload', this.saveState);
  }
  saveState = () => {
    window.removeEventListener('beforeunload', this.saveState)
    localforage.setItem(INDEX_DB_KEY, this.store.getState());
  }
  componentWillUnmount() {
    this.saveState();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router history={hashHistory}>
          <Route path="/" component={AccountList} />
          <Route path="/account-form(/:accountId)" component={AccountForm} />
          <Route path="/transactions" component={TransactionList} />
          <Route path="/transaction-form(/:transactionId)" component={TransactionForm} />
        </Router>
      </Provider>
    );
  }
}
