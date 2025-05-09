import { request } from '@umijs/max';
import type {
  Datum,
  IAdminsListResType,
  IAdminsSearchType,
  ISwitchParams_Type,
  ISwitchRes_Type,
} from './types';

/** 获取管理员数据列表 */
export const getAdminsList = (params: Partial<Datum> & IAdminsSearchType) => {
  return request<IAdminsListResType>('/api/admin/list', {
    method: 'GET',
    params,
  });
};

/** 切换用户启用或禁用状态 */
export const switchAdminStatus = (params: ISwitchParams_Type) => {
  return request<ISwitchRes_Type>('/api/admin/status', {
    method: 'PUT',
    data: params,
  });
};

/** 重置管理列表密码 */
export const resetAdminsPwd = (params: Pick<ISwitchParams_Type, 'adminNo'>) => {
  return request<ISwitchRes_Type>('/api/admin/resetpwd', {
    method: 'PUT',
    data: params,
  });
};
