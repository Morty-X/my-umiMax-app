import { Issue, IssuesAction, ActionTypes } from "./types";

const defaultState: Issue[] = [];

export const issuesReducer = (
  preState: Issue[] = defaultState,
  action: IssuesAction
) => {
  switch (action.type) {
    case ActionTypes.SET_ISSUES:
      return action.payload;
    case ActionTypes.RESET_ISSUES:
      return [];
    default:
      return preState;
  }
};
