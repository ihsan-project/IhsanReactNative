import { all } from 'redux-saga/effects';

import { appDidLoad, unAuthHydrating } from './appSagas';
import { loggingIn, loggedIn } from './authSagas';
import { fetchTodo } from './countSagas';

export default function* rootSaga() {
  yield all([
    loggingIn(),
    fetchTodo(),
    appDidLoad(),
    unAuthHydrating(),
    loggedIn(),
  ]);
}
