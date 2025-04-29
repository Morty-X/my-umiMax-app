export interface Issue {
  id: number;
  number: number;
  title: string;
  labels: Label[];
  state: string;
  locked: boolean;
  comments: number;
  created_at: number;
  updated_at: number;
  closed_at: null;
  author_association: string;
  user: string;
  avatar: string;
}

export interface Label {
  name: string;
  color: string;
}

export enum ActionTypes {
  // 设置issues列表
  SET_ISSUES = "SET_ISSUES",
  // 重置issues列表
  RESET_ISSUES = "RESET_ISSUES",
}

export type IssuesAction =
  | { type: ActionTypes.SET_ISSUES; payload: Issue[] }
  | { type: ActionTypes.RESET_ISSUES };
