import React, {PureComponent} from 'react';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
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
    const middleware = composeWithDevTools(applyMiddleware(thunk, logger()));
    this.store = createStore(reducer, middleware);
  }
  async componentDidMount() {
    console.log('get store from index db');
    await localforage.setDriver([
      localforage.INDEXEDDB
    ])
    const state = await localforage.getItem(INDEX_DB_KEY);
    this.store.dispatch(init(state));

    window.addEventListener('beforeunload', this.saveState);

    console.log(state);
  }
  saveState = () => {
    console.log('put store to index db');
    localforage.setItem(INDEX_DB_KEY, this.store.getState(), () => window.removeEventListener('beforeunload', this.saveState))
  }
  componentWillUnmount() {
    console.log('remove')
    this.saveState()
    window.removeEventListener('beforeunload', this.saveState);
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
