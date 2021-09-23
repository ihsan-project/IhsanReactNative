import {
  LOADING_HIDE,
  LOADING_SHOW,
  APP_DID_LOAD,
  HYDRATE_APP_UNAUTH,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../constants';
import { CALL_API, ApiAction } from '../middleware/api';

export const showLoading = () => ({
  type: LOADING_SHOW,
});

export const hideLoading = () => ({
  type: LOADING_HIDE,
});

export const appDidLoad = () => ({
  type: APP_DID_LOAD,
});

export const hydrateAppUnauth = () => ({
  type: HYDRATE_APP_UNAUTH,
});

export const getProfile = (accessToken: string): ApiAction => ({
  [CALL_API]: {
    endpoint: 'users/profile',
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
    types: [
      FETCH_PROFILE_REQUEST,
      FETCH_PROFILE_SUCCESS,
      FETCH_PROFILE_FAILURE,
    ],
  },
});
