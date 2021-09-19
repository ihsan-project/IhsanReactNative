import { takeEvery, take, put, call, actionChannel } from 'redux-saga/effects';
import { APP_DID_LOAD, HYDRATE_APP_UNAUTH } from '../constants';
import {
  hydrateAppUnauth as hydrateAction,
  fetchSettings as fetchSettingsAction,
} from '../actions';

function* beginUnauthHydration() {
  yield put(hydrateAction());
}

function* downloadSettings() {
  yield put(fetchSettingsAction()); // TODO: Figure out the type error here for redux actions
}

function* checkKeychain() {
  yield console.log('checking keychain');
}

export function* appDidLoad() {
  yield takeEvery(APP_DID_LOAD, beginUnauthHydration);
}

export function* unAuthHydrating() {
  const hydratingChannel = yield actionChannel(HYDRATE_APP_UNAUTH);
  while (true) {
    yield take(hydratingChannel);
    yield downloadSettings();
    yield call(checkKeychain);
  }
}
