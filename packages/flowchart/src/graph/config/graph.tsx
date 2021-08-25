import React from 'react';
import { ConfigProvider, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {
  createGraphConfig,
  EDGE_PATH_TYPE,
  NsGraph,
  XFlowEdge,
  DisposableCollection,
  createHookConfig,
} from '@ali/xflow-core';
import { Edge } from '@antv/x6';
import { IEvent } from '@ali/xflow-core/es/hooks/interface';
import { RECT_NODE, DIAMOND_NODE, RectNode, DiamondNode } from '../../components/nodePanel';
import { Edge1 } from '../../components/edgePanel';

/** 自定义React节点 */

const ANT_PREFIX = 'ant';

export namespace NsAddEdgeEvent {
  export const EVENT_NAME = 'ADD_EDGE_CMD_EVENT';
  export interface IArgs {
    targetPortId: string;
    sourcePortId: string;
    source: string;
    target: string;
    edge: Edge;
  }
}

export const useGraphHook = createHookConfig((config) => {
  config.setRegisterHook((hooks) => {
    const todo = new DisposableCollection();
    const d = hooks.afterGraphInit.registerHook({
      name: 'your biz logic',
      handler: async (args) => {
        const { graph, commands, contextService } = args;
        // 可以绑定事件
      },
    });
    todo.push(d);
    return todo;
  });
});

/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig((config) => {
  config.setNodeTypeParser((node) => node?.renderKey);
  config.setEdgeTypeParser((edge) => edge?.renderKey);
  config.setEdgeRender('EDGE1', Edge1);
  config.setNodeRender(RECT_NODE, RectNode);
  config.setNodeRender(DIAMOND_NODE, DiamondNode);
  config.setX6Config({
    grid: true,
    connecting: {
      //链接桩的位置 https://x6.antv.vision/zh/docs/api/registry/node-anchor
      sourceAnchor: 'bottom',
      //链接桩的位置 https://x6.antv.vision/zh/docs/api/registry/node-anchor
      targetAnchor: 'center',
      connectionPoint: 'anchor',
      snap: { radius: 20 },
      router: { name: 'manhattan' },
      connector: {
        name: EDGE_PATH_TYPE.VERTICAL_NODE,
        args: {
          radius: 15,
        },
      },
      highlight: true,
      dangling: false,
      createEdge() {
        const graph = this;
        const edge = new XFlowEdge({
          attrs: {
            line: {
              strokeDasharray: '5 5',
              stroke: '#808080',
              strokeWidth: 1,
              targetMarker: {
                name: 'block',
                args: {
                  size: '6',
                },
              },
            },
          },
        });
        graph.once('edge:connected', (args) => {
          const { edge, isNew } = args;
          if (isNew && edge.isEdge()) {
            const portId = edge.getTargetPortId();
            const targetNode = edge.getTargetCell();
            if (targetNode && targetNode.isNode()) {
              targetNode.setPortProp(portId, 'connected', false);
              edge.attr({
                line: {
                  strokeDasharray: '',
                  targetMarker: '',
                  stroke: '#808080',
                },
              });
              const targetPortId = edge.getTargetPortId();
              const sourcePortId = edge.getSourcePortId();
              const sourceCellId = edge.getSourceCellId();
              const targetCellId = edge.getTargetCellId();
              graph.trigger(NsAddEdgeEvent.EVENT_NAME, {
                targetPortId,
                sourcePortId,
                source: sourceCellId,
                target: targetCellId,
                edge: edge,
              } as NsAddEdgeEvent.IArgs);
            }
          }
        });
        return edge;
      },
      validateEdge: (args) => {
        const { edge } = args;
        console.log(edge?.target);
        return !!(edge?.target as any)?.port;
      },
      // 是否触发交互事件
      validateMagnet({ magnet }) {
        console.log(magnet.getAttribute('port-group'));
        return magnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP;
      },
      // 显示可用的链接桩
      validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        // 不允许连接到自己
        if (sourceView === targetView) {
          return false;
        }
        // 只能从上游节点的输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === NsGraph.AnchorGroup.TOP) {
          return false;
        }
        // 只能连接到下游节点的输入桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP) {
          return false;
        }
        const node = targetView!.cell as any;
        // 判断目标链接桩是否可连接
        const portId = targetMagnet.getAttribute('port')!;
        const port = node.getPort(portId);
        return !(port && port.connected);
      },
    },
    highlighting: {
      nodeAvailable: {
        name: 'className',
        args: {
          className: 'available',
        },
      },
      magnetAvailable: {
        name: 'className',
        args: {
          className: 'available',
        },
      },
      magnetAdsorbed: {
        name: 'className',
        args: {
          className: 'adsorbed',
        },
      },
    },
    onPortRendered(args) {
      const { port } = args;
      const { contentSelectors } = args;
      const container = contentSelectors && contentSelectors.content;
      const placement = port.group as TooltipPlacement;
      const clz = classnames('xflow-port', { connected: (port as any).connected });
      if (container) {
        ReactDOM.render(
          (
            <ConfigProvider prefixCls={ANT_PREFIX}>
              <Tooltip title={(port as any).tooltip} placement={placement}>
                <span className={clz} />
              </Tooltip>
            </ConfigProvider>
          ) as React.ReactElement,
          container as HTMLElement,
        );
      }
    },
  });
  config.setEvents([
    {
      eventName: 'node:click',
      callback: (e, cmds, ctx) => {
        console.log('click');

        // 可以绑定事件
      },
    } as IEvent<'node:click'>,
  ]);
});
