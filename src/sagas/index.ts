import { all } from 'redux-saga/effects';

import { appDidLoad, unAuthHydrating } from './appSagas';
import { loggingIn, authenticated } from './authSagas';
import { fetchTodo } from './countSagas';

export default function* rootSaga() {
  yield all([
    loggingIn(),
    fetchTodo(),
    appDidLoad(),
    unAuthHydrating(),
    authenticated(),
  ]);
}
