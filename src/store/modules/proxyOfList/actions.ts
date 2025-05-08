import { ProxyOfList_ActionTypes } from './types';

// actions 的工厂函数


interface IOpenParams_Type {
  agentNo: string;
  status: number;
}

/** 改变状态 */
export const changeProxyOfList = (params: IOpenParams_Type) => {
  return {
    type: ProxyOfList_ActionTypes.CHANGE_STATUS,
    payload: params,
  };
};


export type proxyOfListActionType = ReturnType<typeof changeProxyOfList>;
