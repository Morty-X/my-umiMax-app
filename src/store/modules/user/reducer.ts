import { UserAction } from './actions';
import { UserActionTypes } from './types';

const defaultState: API.UserData = {} as API.UserData;

export const userReducer = (preState = defaultState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_INFO:
      return action.payload;
    default:
      return preState;
  }
};
