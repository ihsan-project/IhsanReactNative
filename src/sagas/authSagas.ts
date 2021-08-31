import { put, takeEvery } from 'redux-saga/effects';
import { getAuthToken } from '../actions';
import { LOG_IN } from '../constants';

export function* attemptToLogin(payload) {
  yield console.log('authSaga: attemptToLogin', payload);
  yield put(getAuthToken(payload.idToken));
}

export function* logIn() {
  yield takeEvery(LOG_IN, attemptToLogin);
}
