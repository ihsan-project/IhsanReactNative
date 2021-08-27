import { combineReducers } from 'redux';
import authReducers, { initialState as initialAuthState } from './authReducers';
import countReducers, {
  initialState as initialCountState,
} from './countReducers';
import appReducers, { initialState as initialAppState } from './appReducers';
import loadingReducers, {
  initialState as initialLoadingState,
} from './loadingReducers';

export const initialState = {
  auth: { ...initialAuthState },
  count: { ...initialCountState },
  app: { ...initialAppState },
  loading: { ...initialLoadingState },
};

export default combineReducers({
  app: appReducers,
  auth: authReducers,
  count: countReducers,
  loading: loadingReducers,
});
