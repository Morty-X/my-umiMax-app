import { produce } from 'immer';
import { useEffect, useState, type FC } from 'react';
import { Message, type MessageProps } from './Message';

/**
 * 定义一个接口，扩展了 MessageProps 接口，用于描述带有唯一标识符的消息对象
 */
interface MessageWithId extends MessageProps {
  id: string;
}

/** 正确的容器组件参数类型，仅需 messages 字段 */
interface MessageContainerProps {
  messages: MessageWithId[];
}

/** 容纳Message组件的容器 */
export const MessageContainer: FC<MessageContainerProps> = ({ messages }) => {
  return (
    <div>
      {messages.map(({ id, content, type }) => (
        <Message key={id} content={content} type={type} />
      ))}
    </div>
  );
};

const useMessage = () => {
  const [messages, setMessages] = useState<MessageWithId[]>([]);

  // 使用useEffect在一段时间后让message消失
  useEffect(() => {
    // 检查是否有message需要处理
    if (messages.length > 0) {
      // 设置一个定时器，在2秒后执行
      const timer = setTimeout(() => {
        // 使用produce来修改messages状态，安全地移除第一个message
        setMessages(
          produce(messages, (draft) => {
            // 移除第一个message
            draft.shift();
          }),
        );
      }, 2000);
      // 当组件卸载时，清除定时器，避免内存泄漏
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const messageApi = {
    open(option: MessageProps) {
      setMessages(
        produce(messages, (draft) => {
          draft.push({ id: Date.now().toString(), ...option });
        }),
      );
    },
  };

  return [messageApi, <MessageContainer messages={messages} />] as const;
};

export const message = { useMessage };
