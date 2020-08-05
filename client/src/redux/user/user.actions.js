import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentChannel = (channel) => ({
  type: UserActionTypes.SET_CURRENT_CHANNEL,
  payload: channel,
});
