import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import type { FC } from 'react';

/** Message组件 参数类型 */
export interface MessageProps {
  type: 'success' | 'warning' | 'error';
  content: string;
}
export const Message: FC<MessageProps> = ({ type, content }) => {
  return (
    <div className=" shadow-md w-[200px] h-[60px] flex items-center text-[12px] justify-center gap-2 border-2 border-[#888] rounded-md">
      {type === 'success' && <CheckCircleTwoTone twoToneColor="#49e9a6" />}
      {type === 'warning' && (
        <ExclamationCircleTwoTone twoToneColor="#e4b781" />
      )}
      {type === 'error' && <CloseCircleTwoTone twoToneColor="#ff5f15" />}
      <span>{content}</span>
    </div>
  );
};
