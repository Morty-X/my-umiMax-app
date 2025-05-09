import { request } from '@umijs/max';
import type { ISearchUsersListParams_Type, IUserDatum } from './types';

/** 获取用户列表数据 */
export const getUserListData = (
  params: ISearchUsersListParams_Type = { current: 1, pageSize: 10 },
) => {
  return request('/api/admin/user/list', {
    method: 'GET',
    params,
  });
};

/** 切换用户禁用or启用的状态 */
export const switchUserStatus = (
  params: Pick<IUserDatum, 'status' | 'userNo'>,
) => {
  return request('/api/admin/user/status', {
    method: 'PUT',
    data: params,
  });
};
