import { request } from '@umijs/max';
import type { IOrderListSearchParams_Type, OrderListResType } from './types';

export const getOrdersListData = (params: IOrderListSearchParams_Type) => {
  return request<OrderListResType>('/api/admin/order/list', {
    method: 'GET',
    params,
  });
};
