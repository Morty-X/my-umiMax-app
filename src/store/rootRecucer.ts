// import { authReducer } from './modules/auth/reducer';
// import { userReducer } from './modules/user/reducer';
// import { combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist';
import { countReducer } from './modules/count/reducer';
import { userReducer } from './modules/user/reducer';
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
    key: 'user',
    storage: localStorage,
  },
  {
    user: userReducer,
    count: countReducer,
    // issues: issuesReducer,
    // auth: authReducer,
  },
);
