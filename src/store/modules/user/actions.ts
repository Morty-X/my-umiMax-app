import { UserActionTypes } from "./types";
import { getUserInfo, UserInfoData } from "../../../api";
import { AppDispatch } from "../..";

export const setUserInfo = (userInfo: UserInfoData) => {
  return {
    type: UserActionTypes.SET_USER_INFO,
    payload: userInfo,
  };
};

export const fetchUserInfo = () => {
  return async function (dispatch: AppDispatch) {
    const result = await getUserInfo();
    dispatch(setUserInfo(result.data.data));
  };
};

export type UserAction = ReturnType<typeof setUserInfo>;
