import { request, useRequest } from '@umijs/max';
import type { FC } from 'react';
const api = () => request('http://192.168.68.175:8888/admin/verifycode', {});
const Login: FC = () => {
  const { error, data, loading } = useRequest(api);
  console.log(data);
  return <div className=" text-[red]">登录</div>;
};

export default Login;
