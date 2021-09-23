import axios from 'axios';
import config from 'react-native-config';

export const CALL_API = Symbol('CALL_API');
export interface ApiAction {
  [CALL_API]: {
    endpoint: string;
    headers?: any;
    body?: any;
    method: string;
    types: string[];
  };
}

function makeAPICall(
  endpoint: string,
  body = {},
  method = 'GET',
  headers = {},
) {
  const instance = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': config.API_KEY,
      ...headers,
    },
  });

  let methodPromise;
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    methodPromise = instance.post(endpoint, body);
  } else {
    methodPromise = instance.get(endpoint);
  }

  return methodPromise
    .then((res) => Promise.resolve(res.data))
    .catch((err) => Promise.reject(err));
}

export default (store: any) => (next: any) => (action: any) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, body, method, headers, resolve, reject, context } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  function actionWith(dat: any) {
    const finalAction = { ...action, ...dat };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  next(actionWith({ type: REQUEST }));

  return makeAPICall(endpoint, body, method, headers).then(
    (response) =>
      next(
        actionWith({
          response,
          resolve,
          reject,
          context,
          type: SUCCESS,
        }),
      ),
    (error) =>
      next(
        actionWith({
          type: FAILURE,
          resolve,
          reject,
          context,
          error,
        }),
      ),
  );
};
