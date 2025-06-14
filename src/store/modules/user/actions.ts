import { getUserInfo } from '@/services/index';
import { AppDispatch } from '../..';
import { UserActionTypes } from './types';

export const setUserInfo = (userInfo: API.UserProfile) => {
  return {
    type: UserActionTypes.SET_USER_INFO,
    payload: userInfo,
  };
};

/** 异步获取用户信息 */
export const fetchUserInfo = () => {
  return async function (dispatch: AppDispatch) {
    const result = await getUserInfo();
    dispatch(setUserInfo(result.data));
  };
};

export type UserAction = ReturnType<typeof setUserInfo>;
