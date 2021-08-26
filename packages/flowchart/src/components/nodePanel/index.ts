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
import { RectNodePopover, DiamondNodePopover } from './nodes';

export * from './nodes';

/** 和 graph config 注册的节点保持一致 */
export const RECT_NODE = 'rect';
export const DIAMOND_NODE = 'diamond';
export const NODE_WIDTH = 190;
export const NODE_HEIGHT = 60;

export const treeDataService: NsNodeTreePanel.ITreeDataService = async (meta: any) => {
  return [
    {
      id: 'rect',
      label: 'rect',
      renderKey: RECT_NODE,
      popoverContent: RectNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: {
        items: [
          { group: 'top', id: 'top' },
          { group: 'bottom', id: 'bottom' },
        ],
        groups: {
          top: {
            position: { name: 'top' },
            attrs: {
              fo: {
                width: 8,
                height: 8,
                x: -4,
                y: -4,
                zIndex: 10,
                // magnet决定是否可交互
                magnet: 'true',
              },
            },
            zIndex: 10,
          },
          bottom: {
            position: { name: 'bottom' },
            attrs: {
              fo: {
                width: 8,
                height: 8,
                x: -4,
                y: -4,
                zIndex: 10,
                // magnet决定是否可交互
                magnet: 'true',
              },
            },
            zIndex: 10,
          },
        },
      },
    },
    {
      id: 'diamond',
      label: 'diamond',
      renderKey: DIAMOND_NODE,
      popoverContent: DiamondNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: {
        items: [
          { group: 'top', id: 'top' },
          { group: 'bottom', id: 'bottom' },
        ],
        groups: {
          top: {
            position: { name: 'top' },
            attrs: {
              fo: {
                width: 8,
                height: 8,
                x: -4,
                y: -4,
                zIndex: 10,
                // magnet决定是否可交互
                magnet: 'true',
              },
            },
            zIndex: 10,
          },
          bottom: {
            position: { name: 'bottom' },
            attrs: {
              fo: {
                width: 8,
                height: 8,
                x: -4,
                y: -4,
                zIndex: 10,
                // magnet决定是否可交互
                magnet: 'true',
              },
            },
            zIndex: 10,
          },
        },
      },
    },
  ];
};
