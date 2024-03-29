import {
  LOADING_SHOW,
  LOADING_HIDE,
  FETCH_SETTINGS_REQUEST,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
} from '../constants';

export const initialState = {
  settings: false,
  displayLoading: false,
};

const loadingTypes = {
  displayLoading: {
    [LOADING_SHOW]: true,
    [LOADING_HIDE]: false,
  },
  settings: {
    [FETCH_SETTINGS_REQUEST]: true,
    [FETCH_SETTINGS_SUCCESS]: false,
    [FETCH_SETTINGS_FAILURE]: false,
  },
  profile: {
    FETCH_PROFILE_REQUEST: true,
    FETCH_PROFILE_SUCCESS: false,
    FETCH_PROFILE_FAILURE: false,
  },
};

const handleLoading = (types, action) => {
  const loadingTypesKeys = Object.keys(types);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < loadingTypesKeys.length; index++) {
    const loadingPropName = loadingTypesKeys[index];
    const loadingType = types[loadingPropName];
    if (loadingType[action.type] !== undefined) {
      return {
        [loadingPropName]: loadingType[action.type],
      };
    }
  }

  return null;
};

export default (state = initialState, action) => ({
  ...state,
  ...handleLoading(loadingTypes, action),
});
