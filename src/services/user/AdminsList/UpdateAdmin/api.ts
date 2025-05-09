import { request } from '@umijs/max';
import type { IUpdateAdminParams_Type, IUpdateAdminRes_Type } from './types';

export const updateAdminInfo = (params: IUpdateAdminParams_Type) => {
  return request<IUpdateAdminRes_Type>('/api/admin/update', {
    method: 'PUT',
    data: params,
  });
};
