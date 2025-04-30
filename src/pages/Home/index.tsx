import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';

import { message } from '@/components/Message/index';
import { Button } from 'antd';
/* -------------------------------------------------------------------------- */
const HomePage: React.FC = () => {
  const { name } = useModel('global');
  /* -------------------------------------------------------------------------- */
  const count = useAppSelector((state) => state.count);
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };
  /* -------------------------------------------------------------------------- */
  return (
    <PageContainer ghost>
      {/* message组件挂载点 */}
      {contextHolder}
      <div className={styles.container}>
        <h1 className=" text-[40px]">count:{count}</h1>
        <div className="flex gap-2">
          <button onClick={() => dispatch({ type: 'INCREASE' })}>增加</button>
        </div>
        <Guide name={trim(name)} />

        <div className="flex gap-6">
          <Button onClick={success}>Success</Button>
          <Button onClick={error}>Error</Button>
          <Button onClick={warning}>Warning</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
