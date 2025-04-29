import { request } from '@umijs/max';

/** 获取验证码请求 */
export const getVerifyCode = () =>
  request<API.qrDataResType>('/api/admin/verifycode', {});

/** 登录请求 */
export const loginService = (login_params: {
  adminName: string;
  adminPwd: string;
  no: string;
  verifyCode: string;
}) =>
  request<API.loginResType>('/api/admin/login', {
    method: 'POST',
    data: login_params,
  });

/** 获取用户信息 */

export const getUserInfo = () => {
  return request<API.UserInfoResType>('/api/admin/info');
};
