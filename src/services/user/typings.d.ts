/** 根用户请求相关的类型都写在API命名空间中 */
/* -------------------------------------------------------------------------- */
declare namespace API {
  //验证码数据类型
  interface qrDataResType {
    code: number;
    msg: string;
    data: Data;
  }

  interface Data {
    svg: string;
    no: string;
  }
  /* -------------------------------------------------------------------------- */
  // 登录数据类型
  interface loginResType {
    code: number;
    msg: string;
    data: null;
  }

  export interface UserInfoResType {
    code: number;
    msg: string;
    data: UserData;
  }

  export interface UserData {
    adminNo: string;
    mobileNumber: string;
    adminName: string;
    realName: string;
    avatarUrl: null;
  }
}
