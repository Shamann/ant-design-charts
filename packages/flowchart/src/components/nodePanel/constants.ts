// 节点默认尺寸
export const NODE_WIDTH = 60;
export const NODE_HEIGHT = 40;

export const SUFFIX = 'Node';

// svg 绘制起始点，解决边不清晰的问题
export const NODE_PADDING = 1;

export const NODEPOOL = [
  {
    name: 'Terminal',
  },
  {
    name: 'Process',
  },
  {
    name: 'Decision',
  },
  {
    name: 'Multi Document',
  },
  {
    name: 'Connector',
    width: NODE_HEIGHT,
    height: NODE_HEIGHT,
  },
  {
    name: 'DataIO',
    ports: ['top', 'bottom'],
  },
  {
    name: 'Database',
  },
  {
    name: 'Hard Disk',
  },
  {
    name: 'Stroed Data',
  },
  {
    name: 'Document',
  },
  {
    name: 'Predefined Process',
  },
  {
    name: 'Extract',
  },
  {
    name: 'Merge',
  },
  {
    name: 'Or',
    width: NODE_HEIGHT,
    height: NODE_HEIGHT,
  },
  {
    name: 'Manual Input',
  },
];
