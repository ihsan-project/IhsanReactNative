import { takeEvery, take, put, call, actionChannel } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';
import { APP_DID_LOAD, HYDRATE_APP_UNAUTH, LOG_IN } from '../constants';
import {
  hydrateAppUnauth as hydrateAction,
  fetchSettings as fetchSettingsAction,
  getProfile as getProfileAction,
  logIn as logInAction,
} from '../actions';

function* beginUnauthHydration() {
  yield put(hydrateAction());
}

function* downloadSettings() {
  yield put(fetchSettingsAction()); // TODO: Figure out the type error here for redux actions
}

async function getKeychain() {
  try {
    return await Keychain.getGenericPassword();
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return null;
  }
}

function* checkLoggedIn(keychain: any) {
  const { password: token } = keychain;

  if (token) {
    yield put(getProfileAction());
    yield put(logInAction());
  }
}

export function* appDidLoad() {
  yield takeEvery(APP_DID_LOAD, beginUnauthHydration);
}

export function* unAuthHydrating() {
  const hydratingChannel = yield actionChannel(HYDRATE_APP_UNAUTH);
  while (true) {
    yield take(hydratingChannel);
    yield downloadSettings();
    const keychain = yield call(getKeychain);
    yield call(checkLoggedIn, keychain);
  }
}
