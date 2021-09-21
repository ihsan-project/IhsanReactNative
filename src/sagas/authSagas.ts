import { call, put, takeEvery } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';
import { getAuthToken as getAuthTokenAction } from '../actions';
import { GOOGLE_SIGNED_IN, FETCH_AUTH_SUCCESS } from '../constants';

export function* getAuthToken(payload: any) {
  const { userInfo } = payload;
  yield put(
    getAuthTokenAction(
      userInfo.idToken,
      userInfo.user.id,
      userInfo.user.givenName,
      userInfo.user.email,
    ),
  );
}

export function* loggingIn() {
  yield takeEvery(GOOGLE_SIGNED_IN, getAuthToken);
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
