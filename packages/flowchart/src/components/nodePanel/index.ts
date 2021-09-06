/**
 * 节点面板
 * 内置多种节点，同时提供用户注册机制
 * ```ts
 *  app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
 *     beforeExec: async () => {
 *       const execArgs: NsAddNode.IExecArgs = {
 *         nodeConfig: {
 *           id: 'node1',
 *           x: 100,
 *           y: 30,
 *           width: 100,
 *           height: 40,
 *           renderKey: 'NODE1',
 *         },
 *       }
 *       return [null, execArgs]
 *     },
 *   } as NsAddNode.IConfig)
 *
 *   return app
 * ```
 */

import { NsNodeTreePanel } from '@ali/xflow-extension';
import {
  RectNodePopover,
  DiamondNodePopover,
  CircleNodePopover,
  ParallelogramNodePopover,
} from './nodes';
import {
  RECT_NODE,
  DIAMOND_NODE,
  CIRCLE_NODE,
  PARALLELOGRAM_NODE,
  NODE_WIDTH,
  NODE_HEIGHT,
} from './constants';

export * from './constants';

export * from './nodes';

/** 和 graph config 注册的节点保持一致 */

const getAnchorStyle = (position: string) => {
  return {
    position: { name: position },
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
        style: {
          visibility: 'hidden',
        },
      },
    },
    zIndex: 10,
  };
};

const getPorts = (position = ['top', 'right', 'bottom', 'left']) => {
  return {
    items: position.map((name) => {
      return { group: name, id: name };
    }),
    groups: {
      top: getAnchorStyle('top'),
      right: getAnchorStyle('right'),
      bottom: getAnchorStyle('bottom'),
      left: getAnchorStyle('left'),
    },
  };
};

export const treeDataService: NsNodeTreePanel.ITreeDataService = async (meta: any) => {
  return [
    {
      id: 'circle',
      label: 'circle',
      renderKey: CIRCLE_NODE,
      popoverContent: CircleNodePopover,
      width: NODE_HEIGHT,
      height: NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: 'diamond',
      label: 'diamond',
      renderKey: DIAMOND_NODE,
      popoverContent: DiamondNodePopover,
      width: NODE_HEIGHT,
      height: NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
    },
    {
      id: 'parallelogram',
      label: 'parallelogram',
      renderKey: PARALLELOGRAM_NODE,
      popoverContent: ParallelogramNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
    },

    {
      id: 'rect',
      label: 'rect',
      renderKey: RECT_NODE,
      popoverContent: RectNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(),
    },
  ];
};
