// 类型检测
export const isType = (value: any, type: string): boolean => {
  const { toString } = {};
  return toString.call(value) === `[object ${type}]`;
};

export const isNumber = (value: unknown) => {
  return isType(value, 'Number');
};

// 创建节点路径
export const createPath = (paths: (string | number)[][]) => {
  if (!paths.length) {
    return;
  }
  let path = '';
  paths.forEach((item) => {
    const [c, x, y] = item;
    path += isNumber(y) ? ` ${c} ${x} ${y}` : ` ${c}`;
  });

  return path;
};
