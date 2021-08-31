import { put, takeEvery } from 'redux-saga/effects';
import { getAuthToken } from '../actions';
import { LOG_IN } from '../constants';

export function* attemptToLogin(payload: any) {
  yield console.log('authSaga: attemptToLogin', payload);
  yield put(getAuthToken(
      payload.idToken,
      payload.user.id,
      payload.user.givenName,
      payload.user.email
    )
  );
}

export function* logIn() {
  yield takeEvery(LOG_IN, attemptToLogin);
}
