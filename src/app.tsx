import { persistor, store } from '@/store';
import { BulbOutlined, LogoutOutlined } from '@ant-design/icons';
import { message, type MenuProps } from 'antd';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return {
    // name: 'Serati Ma',
    // avatar:
    // 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  };
}

/** 运行时布局配置 */
export const layout = () => {
  //initialState上面登录函数返回的信息
  const DropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
    {
      key: 'theam',
      icon: <BulbOutlined />,
      label: '切换主题',
    },
    {
      key: 'theam',
      icon: <BulbOutlined />,
      label: '切换主题',
    },
  ];
  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  return {
    title: 'Serati Ma',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    primaryColor: '#1890ff',
    // splitMenus: true,
    // 展示 用户名 头像 退出登录相关组件
    rightRender: () => (
      <>
        <div>你好</div>
      </>
    ),
    // avatarProps: {
    // src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    // title: '用户', //右上角名称
    // size: 'large',
    // },
    // 头像设置
    // avatarProps: {
    //   src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    //   title: '用户', //右上角名称
    //   size: 'small',
    //   render: (prop, dom) => {
    //     return (
    //       <Dropdown
    //         menu={{
    //           items: DropdownItems,
    //           onClick: DropdownOnClick,
    //         }}
    //       >
    //         {dom}
    //       </Dropdown>
    //     );
    //   },
    // },
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
