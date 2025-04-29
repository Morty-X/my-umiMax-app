import { Issue, ActionTypes } from "./types";
import { fetchIssues } from "../../../api";
import { type AppDispatch, type AppThunkAction } from "../..";
// action creator : action工厂函数
// 同步更新
export const setIssues = (payload: Issue[]) => {
  return {
    type: ActionTypes.SET_ISSUES,
    payload,
  } as const;
};

export const resetIssues = () => {
  return {
    type: ActionTypes.RESET_ISSUES,
  } as const;
};

// ThunkAction<返回值类型，根状态类型，额外参数类型，Action类型>

export const setIssuesAsync = () => {
  return async function (dispatch: AppDispatch) {
    const res = await fetchIssues();
    dispatch(setIssues(res.data.data));
  } as AppThunkAction;
};
