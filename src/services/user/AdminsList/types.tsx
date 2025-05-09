/** 获取管理员列表信息的请求数据 */
export interface IAdminsListResType {
  code: number;
  msg: string;
  data: IAdminType;
}

export interface IAdminType {
  pageSize: number;
  current: number;
  count: number;
  totalPages: number;
  data: Datum[];
}

export interface Datum {
  adminNo: string;
  adminName: string;
  mobileNumber: string;
  realName: string;
  status: number;
  createTime: string;
  updateTime: string;
  defaultPwd: string;
  updatedBy: string;
}

export interface IAdminsSearchType {
  adminNo?: string;
  adminName?: string;
  current?: number;
  mobileNumber?: string;
  pageSize?: number;
  realName?: string;
  status?: number;
}

/** 修改启用或禁用状态 参数类型 */
export interface ISwitchParams_Type {
  adminNo: string;
  status: number;
}

/** 修改启用或禁用状态 响应类型 */
export interface ISwitchRes_Type {
  code: number;
  msg: string;
  data: any;
}
