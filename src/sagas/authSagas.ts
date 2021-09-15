import { put, takeEvery } from 'redux-saga/effects';
import { getAuthToken } from '../actions';
import { LOG_IN } from '../constants';

export function* attemptToLogin(payload: any) {
  const { userInfo } = payload;
  yield console.log('authSaga: attemptToLogin', userInfo);
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
