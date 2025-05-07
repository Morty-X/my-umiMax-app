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
