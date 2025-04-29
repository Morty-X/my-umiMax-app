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

  /**用户登录请求参数*/
  export interface UserLoginRequest {
    /**用户名*/
    adminName: string;
    /** 密码（建议加密传输） */
    adminPwd: string;
    /**验证码唯一标识*/
    no: string;
    /**用户输入的验证码*/
    verifyCode: string;
  }

  // 登录结果数据响应类型
  interface loginResType {
    code: number;
    msg: string;
    data?: null;
  }

  /* -------------------------------------------------------------------------- */
  // 获取用户信息响应数据类型
  export interface UserInfoResType {
    code: number;
    msg: string;
    data: UserProfile;
  }

  /** 用户基本信息 */
  export interface UserProfile {
    adminNo: string;
    mobileNumber: string;
    adminName: string;
    realName: string;
    avatarUrl: null | string;
  }
}
