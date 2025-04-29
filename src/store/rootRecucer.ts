import { authReducer } from './modules/auth/reducer';
import { countReducer } from './modules/count/reducer';
import { issuesReducer } from './modules/issues/reducer';
import { userReducer } from './modules/user/reducer';
// import { combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist';
// import sessionStorage from "redux-persist/es/storage/session";
import localStorage from 'redux-persist/es/storage';
/*
export const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: "user",
      storage: localStorage,
    },
    userReducer
  ),
  count: countReducer,
  issues: issuesReducer,
  auth: persistReducer(
    {
      key: "auth",
      storage: sessionStorage,
    },
    authReducer
  ),
});
*/

export const rootReducer = persistCombineReducers(
  {
    key: 'bilibili',
    storage: localStorage,
  },
  {
    user: userReducer,
    count: countReducer,
    issues: issuesReducer,
    auth: authReducer,
  },
);
