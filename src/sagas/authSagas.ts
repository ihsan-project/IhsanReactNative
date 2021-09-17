import { put, takeEvery } from 'redux-saga/effects';
import { getAuthToken } from '../actions';
import { LOG_IN, FETCH_AUTH_SUCCESS } from '../constants';

export function* attemptToLogin(payload: any) {
  const { userInfo } = payload;
  yield put(
    getAuthToken(
      userInfo.idToken,
      userInfo.user.id,
      userInfo.user.givenName,
      userInfo.user.email,
    ),
  );
}

export function* logIn() {
  yield takeEvery(LOG_IN, attemptToLogin);
}

export function* saveAccessToken(payload: any) {
  yield console.log('user info', payload.response);
}

export function* loggedIn() {
  yield takeEvery(FETCH_AUTH_SUCCESS, saveAccessToken);
}