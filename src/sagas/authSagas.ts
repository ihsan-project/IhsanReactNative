import { call, put, takeEvery, take, actionChannel } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';
import {
  getAuthToken as getAuthTokenAction,
  loggedOut as loggedOutAction,
} from '../actions';
import {
  GOOGLE_SIGNED_IN,
  FETCH_AUTH_SUCCESS,
  LOGGING_OUT,
} from '../constants';

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

async function clearAccessToken() {
  await Keychain.resetGenericPassword();
}

export function* handleUserInfo(payload: any) {
  const { response } = payload;
  yield call(saveAccessToken, response);
}

export function* authenticated() {
  yield takeEvery(FETCH_AUTH_SUCCESS, handleUserInfo);
}

export function* loggingOut() {
  const loggingOutChannel = yield actionChannel(LOGGING_OUT);
  while (true) {
    yield take(loggingOutChannel);
    yield call(clearAccessToken);
    yield put(loggedOutAction());
  }
}
