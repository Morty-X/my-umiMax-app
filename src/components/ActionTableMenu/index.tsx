import { Icon } from '@iconify/react';
import { Button } from 'antd';
interface ActionTableMenuPropType {
  onFreshTable?: () => void;
  todoSomeThing?: () => void;
  btnText?: string;
}
/* 表格上方操作栏 */
const ActionTableMenu = ({
  onFreshTable,
  todoSomeThing,
  btnText,
}: ActionTableMenuPropType) => {
  /** 刷新表格 */
  return (
    <>
      <div className="flex h-[70px] items-center justify-between w-full">
        <div>
          {todoSomeThing ? (
            <Button type="primary" onClick={() => todoSomeThing()}>
              {btnText}
            </Button>
          ) : (
            ''
          )}
        </div>
        <div className="w-[40px] flex h-[40px] shadow-[0_0.2em_0_0.1em_#3f3f3f] hover:shadow-[0_0_0_0_#3f3f3f] rotate-x-2 transition-all border rounded-md cursor-pointer justify-center items-center border-[#000]">
          <Icon
            onClick={onFreshTable}
            icon="ion:reload-outline"
            className="text-[30px] text-[#2a86ff]"
          />
        </div>
      </div>
    </>
  );
};

export default ActionTableMenu;
