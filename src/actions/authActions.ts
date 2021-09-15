import {
  LOG_IN,
  LOG_OUT,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from '../constants';
import { CALL_API, ApiAction } from '../middleware/api';

export const logIn = (userInfo: any | null): any => ({
  type: LOG_IN,
  userInfo,
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
    body: { digest, uuid, first_name: firstName, email },
    types: [FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE],
  },
});
