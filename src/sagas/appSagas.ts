import { takeEvery, put } from 'redux-saga/effects';
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

export function* appDidLoad() {
  yield takeEvery(APP_DID_LOAD, beginUnauthHydration);
}

export function* unAuthHydrating() {
  yield takeEvery(HYDRATE_APP_UNAUTH, downloadSettings);
  yield console.log('do other unauthenticated hydration here');
}
