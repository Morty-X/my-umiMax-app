declare namespace ProxyOfListAPI {
  export interface searchProxyOfListParams {
    agentAccount?: string;
    agentNo?: string;
    current?: number;
    mobileNumber?: string;
    pageSize?: number;
    realName?: string;
    status?: string;
  }

  export interface SearchResType {
    code: number;
    msg: string;
    data: SearchData;
  }

  export interface SearchData {
    pageSize: number;
    current: number;
    count: number;
    totalPages: number;
    data: Datum[];
  }

  export interface Datum {
    agentNo: string;
    agentAccount: string;
    mobileNumber: string;
    realName: string;
    status: number;
    createTime: string;
    updateTime: string;
    defaultPwd: string;
    updatedBy: string;
  }
}
