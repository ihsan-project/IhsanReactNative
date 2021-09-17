import { LOG_IN, LOG_OUT, FETCH_AUTH_SUCCESS } from '../constants';

export const initialState = {
  isLoggedIn: false,
  user: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        user: action.response,
      };
    default:
      return state;
  }
};
