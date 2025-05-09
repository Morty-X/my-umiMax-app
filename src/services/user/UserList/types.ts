export interface IUsersListRes_Type {
  code: number;
  msg: string;
  data: IUsers;
}

export interface IUsers {
  pageSize: number;
  current: number;
  count: number;
  data: IUserDatum[];
}

export interface IUserDatum {
  id: number;
  createTime: string;
  upstringTime: string;
  userNo: string;
  countryCode: string;
  mobileNumber: string;
  avatarUrl:  string;
  nickName: string;
  gender: number;
  province: null | string;
  city: null | string;
  area: null | string;
  status: number;
  homeAddressNo: null | string;
  companyAddressNo: null | string;
}

export interface ISearchUsersListParams_Type {
  current: number;
  pageSize: number;
  userNo?: string;
  nickName?: string;
  mobileNumber?: string;
  status?: number;
}
