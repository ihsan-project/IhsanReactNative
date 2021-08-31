import { LOG_IN, LOG_OUT } from '../constants';

export const logIn = (idToken: string): any => ({
  type: LOG_IN,
  payload: { idToken },
});

export const logOut = (): any => ({
  type: LOG_OUT,
});
