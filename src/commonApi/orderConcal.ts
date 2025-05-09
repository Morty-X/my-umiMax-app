import { request } from '@umijs/max';

/** 公共的orderCancel的API */
export const getOrderCancelState = () => {
  return request<IOrderStatusResType>('/api/admin/config/ordercancel', {
    method: 'GET',
  });
};

interface IOrderStatusResType {
  code: number;
  msg: string;
  data: IOrderStatusData;
}

interface IOrderStatusData {
  userCancelTips: string[];
  adminCancelTips: string[];
  agentCancelTips: string[];
  riderCancelTips: string[];
  userCancelRules: ErCancelRule[];
  riderCancelRules: ErCancelRule[];
}
interface ErCancelRule {
  price: number;
  timeRange: number[];
}
