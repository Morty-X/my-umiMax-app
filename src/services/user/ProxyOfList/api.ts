import { request } from '@umijs/max';

/** 根据报表单内容查询代理列表数据 */
export const searchProxyOfList = (
  params: ProxyOfListAPI.searchProxyOfListParams,
) => {
  return request<ProxyOfListAPI.SearchResType>('/api/admin/agent/list', {
    method: 'GET',
    params,
  });
};

export interface updateParamsType {
  agentNo: string;
  status: number;
}

/** 修改用户状态 */
// http://192.168.68.175:8888/admin/agent/status
export const updateProxyOfListUser = (updateParams: updateParamsType) => {
  return request<ProxyOfListAPI.SearchResType>('/api/admin/agent/status', {
    method: 'PUT',
    data: updateParams,
  });
};

/** 重置密码 */
export const resetPwdProxyOfList = (agentNo: string) => {
  return request<ProxyOfListAPI.SearchResType>('/api/admin/agent/resetpwd', {
    method: 'PUT',
    data: { agentNo },
  });
};
