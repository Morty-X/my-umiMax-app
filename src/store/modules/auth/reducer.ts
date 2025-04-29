import { produce } from 'immer';
import { type AuthAction } from './actions';
import { AuthActionTypes } from './types';

type AuthState = {
  cookie: string;
};
const defaultState: AuthState = { cookie: '' };

const authReducer = (
  preState: AuthState = defaultState,
  action: AuthAction,
) => {
  switch (action.type) {
    case AuthActionTypes.SET_COOKIE:
      return produce(preState, (draft) => {
        draft.cookie = action.payload;
      });
    case AuthActionTypes.REMOVE_COOKIE:
      return produce(preState, (draft) => {
        draft.cookie = '';
      });
    default:
      return preState;
  }
};

export { authReducer };

// [].reduce(function (prev) {}, {})
