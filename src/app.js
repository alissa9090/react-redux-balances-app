import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import localforage from 'localforage';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducers';
import createSyncStoreWithIndexedDbMiddleware from './middleware/sync-store-wirh-indexed-db';
import {init} from './actions/common';
import AccountList from './screens/AccountList';
import AccountForm from './screens/AccountForm';
import TransactionList from './screens/TransactionList';
import TransactionForm from './screens/TransactionForm';

const INDEX_DB_KEY = 'ReactReduxBalanceApp';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    const middleware = composeWithDevTools(applyMiddleware(createSyncStoreWithIndexedDbMiddleware(INDEX_DB_KEY)));
    this.store = createStore(reducer, middleware);
  }
  async componentDidMount() {
    await localforage.setDriver([
      localforage.INDEXEDDB
    ]);
    const state = await localforage.getItem(INDEX_DB_KEY);
    this.store.dispatch(init(state));
  }
  render() {
    return (
      <Provider store={this.store}>
        <MemoryRouter>
          <div>
            <Route exact path="/" component={AccountList} />
            <Route path="/account-form/:accountId?" component={AccountForm} />
            <Route path="/transactions" component={TransactionList} />
            <Route path="/transaction-form/:accountId" component={TransactionForm} />
          </div>
        </MemoryRouter>
      </Provider>
    );
  }
}
