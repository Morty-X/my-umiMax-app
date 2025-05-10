import { request } from '@umijs/max';
import type { IOrderFeeData, IOrderFeeRes_Type } from './types';

export const getOrderFeeData = () => {
  return request<IOrderFeeRes_Type>('/api/admin/config/orderfee', {
    method: 'GET',
  });
};

export const updateOrderFeeData = (
  params: Pick<IOrderFeeData, 'agentExtract' | 'platformExtract'> & {
    feeTips?: number[];
  },
) => {
  return request<common_API_Res_Type>('/api/admin/config/orderfee', {
    method: 'POST',
    data: params,
  });
};
