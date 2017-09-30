import localforage from 'localforage';

function createSyncStoreWithIndexedDbMiddleware(INDEX_DB_KEY) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const returnedValue =  next(action);

    localforage.setItem(INDEX_DB_KEY, getState());

    return returnedValue;
  };
}

export default createSyncStoreWithIndexedDbMiddleware;