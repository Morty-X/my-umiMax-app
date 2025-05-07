import { request } from '@umijs/max';
import type { AddProxy_Res_Type, AddProxyParams_Type } from './types';

export const addProxy = (params: AddProxyParams_Type) => {
  return request<AddProxy_Res_Type>('/api/admin/agent/add', {
    method: 'POST',
    data: params,
  });
};
