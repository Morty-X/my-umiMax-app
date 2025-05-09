/**
 * 过滤对象中值为 undefined、null 或空字符串的属性，并对字符串类型属性进行 trim 操作
 * @param values 原始对象
 * @returns 过滤后的新对象（保留原始键值类型）
 */
export function filterObject<T extends object>(
  values: T,
): { [K in keyof T]: T[K] } {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // 如果是字符串类型，则调用 trim 方法
      if (typeof value === 'string') {
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
          acc[key as keyof T] = trimmedValue as T[keyof T];
        }
      } else {
        acc[key as keyof T] = value as T[keyof T];
      }
    }
    return acc;
  }, {} as { [K in keyof T]: T[K] });
}

// 使用示例
/* const originalValues = {
  name: 'Alice',
  age: 30,
  email: '',
  address: null,
  hobby: undefined,
};

const filtered = filterObject(originalValues); */
/* 结果：
{
  name: "Alice",
  age: 30
}
*/
