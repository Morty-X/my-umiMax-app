//192.168.68.175:8888/admin/add

import { request } from '@umijs/max';

export interface AddAdminUser_Params_Type {
  adminName: string;
  mobileNumber: string;
  realName: string;
}

/** 新增管理员 */
export const addAdminUser = (params: AddAdminUser_Params_Type) => {
  return request<common_API_Res_Type>('/api/admin/add', {
    method: 'POST',
    data: params,
  });
};
