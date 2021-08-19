import {
  LOADING_SHOW,
  LOADING_HIDE,
  APP_DID_LOAD,
  FETCH_SETTINGS_SUCCESS,
} from '../constants';

export const initialState = {
  displayLoading: false,
  didLoad: false,
  settings: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SHOW:
      return {
        ...state,
        displayLoading: true,
      };
    case LOADING_HIDE:
      return {
        ...state,
        displayLoading: false,
      };
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
