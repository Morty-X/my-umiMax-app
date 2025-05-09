// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // 引入 timezone 插件
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件

dayjs.extend(utc);
dayjs.extend(timezone);

// 工具函数：UTC → 目标时区
export const formatDateTime = (
  isoString: string,
  targetTimezone = 'Asia/Shanghai',
) => {
  return dayjs(isoString)
    .utc() // 声明输入为 UTC 时间
    .tz(targetTimezone) // 转换为目标时区（如中国时区）
    .format('YYYY/MM/DD HH:mm'); // 格式化为目标字符串
};
