import { APP_DID_LOAD, FETCH_SETTINGS_SUCCESS } from '../constants';

export const initialState = {
  didLoad: false,
  settings: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_DID_LOAD:
      return {
        ...state,
        didLoad: true,
      };
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.response,
      };
    default:
      return state;
  }
};
