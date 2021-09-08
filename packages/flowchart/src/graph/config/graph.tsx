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
import { Edge, Markup, Shape } from '@antv/x6';
import { IEvent } from '@ali/xflow-core/es/hooks/interface';
import {
  RECT_NODE,
  DIAMOND_NODE,
  CIRCLE_NODE,
  PARALLELOGRAM_NODE,
  RectNode,
  DiamondNode,
  CircleNode,
  ParallelogramNode,
  NODE_HEIGHT,
} from '../../components/nodePanel';
import { Edge1 } from '../../components/edgePanel';
import { nodeMove } from './events';

const { move, moved } = nodeMove();

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
  config.setNodeRender(CIRCLE_NODE, CircleNode);
  config.setNodeRender(PARALLELOGRAM_NODE, ParallelogramNode);
  config.setX6Config({
    grid: true,
    resizing: {
      enabled: true,
      minWidth: NODE_HEIGHT,
      minHeight: NODE_HEIGHT,
      preserveAspectRatio: (shape) => {
        const { data } = shape;
        return data?.name === 'custom-circle';
      },
    },
    // selecting: {
    //   enabled: true,
    //   rubberband: true,
    //   showNodeSelectionBox: true,
    // },
    connecting: {
      router: 'manhattan',
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          labels: [
            {
              attrs: {
                line: {
                  stroke: '#73d13d',
                },
                text: {
                  text: 'label',
                },
              },
            },
          ],
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateEdge: (args) => {
        const { edge } = args;
        return !!(edge?.target as any)?.port;
      },
      // 是否触发交互事件
      validateMagnet({ magnet }) {
        // 所有锚点均可触发
        return true;
        // return magnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP;
      },
      // 显示可用的链接桩
      validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        // 不允许连接到自己
        if (sourceView === targetView) {
          return false;
        }
        // // 只能从上游节点的输出链接桩创建连接
        // if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === NsGraph.AnchorGroup.TOP) {
        //   return false;
        // }
        // // 只能连接到下游节点的输入桩
        // if (!targetMagnet || targetMagnet.getAttribute('port-group') !== NsGraph.AnchorGroup.TOP) {
        //   return false;
        // }
        const node = targetView!.cell as any;
        // 判断目标链接桩是否可连接
        const portId = targetMagnet?.getAttribute('port')!;
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

  const changePortsVisible = (visible: boolean) => {
    const container = document.getElementsByClassName('xflow-canvas-root')[0];
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = visible ? 'visible' : 'hidden';
    }
  };
  config.setEvents([
    {
      eventName: 'node:click',
      callback: (e, cmds, ctx) => {
        console.log('click');
      },
    } as IEvent<'node:click'>,
    {
      eventName: 'node:mouseenter',
      callback: (e, cmds, ctx) => {
        changePortsVisible(true);
      },
    } as IEvent<'node:mouseenter'>,
    {
      eventName: 'node:mouseleave',
      callback: (e, cmds, ctx) => {
        changePortsVisible(false);
      },
    } as IEvent<'node:mouseleave'>,
    {
      eventName: 'node:move',
      callback: (e, cmds, ctx) => {
        move(e, cmds, ctx);
      },
    } as IEvent<'node:move'>,
    {
      eventName: 'node:moved',
      callback: (e, cmds, ctx) => {
        moved(e, cmds, ctx);
      },
    } as IEvent<'node:moved'>,
  ]);
});
