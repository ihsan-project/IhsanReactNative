import { takeEvery } from 'redux-saga/effects';
import { LOG_IN } from '../constants';

export function* attemptToLogin(payload) {
  yield console.log('authSaga: attemptToLogin', payload);
}

export function* logIn() {
  yield takeEvery(LOG_IN, attemptToLogin);
}
