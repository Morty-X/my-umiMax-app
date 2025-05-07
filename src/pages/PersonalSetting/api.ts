import { request } from '@umijs/max';

interface paramsType {
  mobileNumber: string;
  realName: string;
  avatarUrl: null | string;
}

interface ResType {
  code: number;
  data: any;
  msg: string;
}

/** 修改用户信息的API */
export const updatePersonalInfo = (params: paramsType) => {
  return request<ResType>('/api/admin/update/self', {
    method: 'PUT',
    data: params,
  });
};
