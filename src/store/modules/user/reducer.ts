import { UserAction } from "./actions";
import { UserActionTypes } from "./types";
import { UserInfoData } from "../../../api";

const defaultState: UserInfoData = {} as UserInfoData;

export const userReducer = (preState = defaultState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_INFO:
      return action.payload;
    default:
      return preState;
  }
};
