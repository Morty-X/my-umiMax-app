import { LockTwoTone, SettingTwoTone, StopTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import React from 'react';

import { Link } from '@umijs/max';
import store from 'store';
import type { IUserInfo } from './types';

/** 本场存储的数据 */
const userData = store.get('persist:user');

/** 与用户相关的数据 */
const userInfo: IUserInfo = JSON.parse(userData.user);

console.log(userInfo);

/** 下拉选项点击事件 */
const onClick: MenuProps['onClick'] = ({ key }) => {};

const items: MenuProps['items'] = [
  {
    key: '0',
    label: (
      <div className="flex flex-col justify-center px-3 py-2 text-white bg-gradient-to-r from-[#677bd1] to-[#e6a0fe]">
        <h1 className=" text-[20px] ">
          {userInfo.realName} {userInfo.mobileNumber}
        </h1>
        <p>NO:{userInfo.adminNo}</p>
      </div>
    ),
    style: { padding: 0 },
  },
  {
    key: '1',
    label: (
      <Link to={'/personal/update'}>
        <div>
          <SettingTwoTone /> <span className="ml-[4px]">个人设置</span>
        </div>
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to={'/personal/updatePwd'}>
        <div>
          <LockTwoTone /> <span className="ml-[4px]">修改密码</span>
        </div>
      </Link>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: (
      <Link to={'/auth'}>
        <div>
          <StopTwoTone /> <span className="ml-[4px]">退出登录</span>
        </div>
      </Link>
    ),
  },
];

const Profile: React.FC = () => (
  <Dropdown
    menu={{ items, onClick, style: { padding: 0 } }}
    placement="bottomLeft"
    arrow
  >
    <Avatar
      src={
        <img src={userInfo.avatarUrl || '/src/assets/images/tom01.png'}></img>
      }
      className="cursor-pointer "
    />
  </Dropdown>
);

export default Profile;
