import type { proxyOfListActionType } from './actions';
import { ProxyOfList_ActionTypes } from './types';

const defaultState: Partial<ProxyOfListAPI.Datum> = {
  // agentAccount: '',
  // agentNo: '',
  // mobileNumber: '',
  // realName: '',
  // status: 0,
  // createTime: '',
  // updatedBy: '',
  // defaultPwd: '',
  // updateTime: '',
};

export const proxyOfListReducer = (
  preState = defaultState,
  action: proxyOfListActionType,
) => {
  switch (action.type) {
    // 启用 or 禁用
    case ProxyOfList_ActionTypes.CHANGE_STATUS:
      return action.payload;
    default:
      return preState;
  }
};
