import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Typography } from 'antd';
import type { FC } from 'react';

interface IPropType {
  title: string;
  linkTo: string;
}

const CommonFormTitle: FC<IPropType> = ({ title, linkTo }) => {
  return (
    <>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        <Link to={linkTo}>
          <ArrowLeftOutlined className="text-[20px] text-[#666] hover:text-[#7265e6] mr-[6px] cursor-pointer  transition-all" />{' '}
        </Link>
        {title}
      </Typography.Title>
    </>
  );
};
export default CommonFormTitle;
