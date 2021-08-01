import { CALL_API, ApiAction } from '../middleware/api';
import {
  FETCH_SETTINGS_REQUEST,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
} from '../constants';

export const fetchSettings = (): ApiAction => ({
  [CALL_API]: {
    endpoint: 'settings',
    // headers: {
    //     'X-Identity-Key': SECRET_KEY,
    //     'X-Identity-Token': authToken
    // },
    method: 'GET',
    types: [
      FETCH_SETTINGS_REQUEST,
      FETCH_SETTINGS_SUCCESS,
      FETCH_SETTINGS_FAILURE,
    ],
  },
});

export default fetchSettings;
