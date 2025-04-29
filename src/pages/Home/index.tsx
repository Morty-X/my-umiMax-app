import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  /* -------------------------------------------------------------------------- */
  const count = useAppSelector((state) => state.count);
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <h1 className=" text-[40px]">count:{count}</h1>
        <div className="flex gap-2">
          <button onClick={() => dispatch({ type: 'INCREASE' })}>增加</button>
        </div>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
