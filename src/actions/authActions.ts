import {
  LOG_IN,
  LOG_OUT,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from '../constants';
import { CALL_API, ApiAction } from '../middleware/api';

export const logIn = (idToken: string | null): any => ({
  type: LOG_IN,
  payload: { idToken },
});

export const logOut = (): any => ({
  type: LOG_OUT,
});

export const getAuthToken = (idToken: string): ApiAction => ({
  [CALL_API]: {
    endpoint: 'authorizations',
    method: 'POST',
    body: { digest: idToken },
    types: [FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE],
  },
});
