import {
  LOG_IN,
  LOG_OUT,
  GOOGLE_SIGNED_IN,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from '../constants';
import { CALL_API, ApiAction } from '../middleware/api';

export const googleAuthenticated = (userInfo?: any): any => ({
  type: GOOGLE_SIGNED_IN,
  userInfo,
});

export const logIn = (): any => ({
  type: LOG_IN,
});

export const logOut = (): any => ({
  type: LOG_OUT,
});

export const getAuthToken = (
  digest: string,
  uuid: string,
  firstName: string,
  email: string,
): ApiAction => ({
  [CALL_API]: {
    endpoint: 'authorizations',
    method: 'POST',
    body: { digest, uuid, first_name: firstName, email, platform: 1 }, // Need to use the settings for the platform value here
    types: [FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE],
  },
});
