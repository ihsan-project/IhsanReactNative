import { call, put, takeEvery } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';
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

async function saveAccessToken(response: any) {
  await Keychain.setGenericPassword(response.email, response.access);
}

export function* handleUserInfo(payload: any) {
  const { response } = payload;
  yield call(saveAccessToken, response);
}

export function* loggedIn() {
  yield takeEvery(FETCH_AUTH_SUCCESS, handleUserInfo);
}
