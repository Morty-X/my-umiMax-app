import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

/** 根组件App.tsx  使用redux全局状态管理 需要包装一层 Provider */
export function rootContainer(container: JSX.Element) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>{container}</PersistGate>
      </Provider>
    </>
  );
}

/* -------------------------------------------------------------------------- */
