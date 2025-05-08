import { request } from '@umijs/max';

export interface IUpdateAgentParams {
  agentAccount: string;
  agentNo: string;
  mobileNumber: string;
  realName: string;
  status: number;
}
export interface IUpdateResType {
  code: number;
  data: any;
  msg: string;
}

/** 修改代理API */
export const updateAgentApi = (params: IUpdateAgentParams) => {
  return request<IUpdateResType>('/api//admin/agent/update', {
    method: 'PUT',
    data: params,
  });
};
// http://192.168.68.175:8888/admin/agent/update
