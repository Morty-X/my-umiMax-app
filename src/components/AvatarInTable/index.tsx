import { Avatar } from 'antd';

// 定义表格行数据的基础接口
interface UserRow {
  avatarUrl?: string;
  nickName?: string;
  mobileNumber?: string;
}

interface IAvatarInTableProp<T> {
  row: T;
}

/** 表格列中头像部分的渲染 */
const AvatarInTable = <T extends UserRow & {}>(
  props: IAvatarInTableProp<T>,
) => {
  const { row } = props;

  return (
    <div className="flex items-center">
      <Avatar
        src={
          <img
            src={
              row.avatarUrl ||
              'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
            }
            alt="avatar"
          />
        }
      />
      <div>
        <p>{row.nickName}</p>
        <p className="text-[#666]">{row.mobileNumber}</p>
      </div>
    </div>
  );
};

export default AvatarInTable;
