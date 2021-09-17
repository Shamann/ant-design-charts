import React from 'react';
import { ConfigProvider, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {
  createGraphConfig,
  // XFlowEdge,
  DisposableCollection,
  createHookConfig,
  XFlowEdgeCommands,
  NsGraph,
} from '@ali/xflow-core';
import { Edge, Shape } from '@antv/x6';
import { IEvent } from '@ali/xflow-core/es/hooks/interface';
import { NodeConstants, registerNode } from '../../components/nodePanel';

import { registerEdge, DefaultEdgeConfig } from '../../components/edgePanel';
import { movedNode, resizeNode, changePortsVisible } from './events';

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
      name: 'call add edge to replace temp edge',
      handler: async (args) => {
        const { commands, graph } = args;
        graph.on(NsAddEdgeEvent.EVENT_NAME, (args: NsAddEdgeEvent.IArgs) => {
          const { edge, ...edgeConfig } = args;
          commands.executeCommand(XFlowEdgeCommands.ADD_EDGE.id, {
            edgeConfig: {
              ...edgeConfig,
              source: {
                cell: edgeConfig.source,
                port: edgeConfig.sourcePortId,
              },
              target: {
                cell: edgeConfig.target,
                port: edgeConfig.targetPortId,
              },
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                  },
                  strokeDasharray: '5 5',
                  strokeWidth: 1,
                },
              },
              data: { ...edgeConfig },
            },
            source: {
              cell: edgeConfig.source,
              port: edgeConfig.sourcePortId,
            },
            target: {
              cell: edgeConfig.target,
              port: edgeConfig.targetPortId,
            },
            attrs: DefaultEdgeConfig,
            data: { ...edgeConfig },
          });
          args.edge.remove();
        });
      },
    });
    todo.push(d);
    return todo;
  });
});

const XFlowEdge = Shape.Edge.registry.register(
  'xflow',
  Shape.Edge.define({
    zIndex: 1,
    highlight: true,
    shape: 'EDGE1',
    name: 'custom-edge',
    label: '',
    anchor: {
      name: 'midSide',
      args: {
        dx: 10,
      },
    },
    attrs: DefaultEdgeConfig,
    data: {
      label: '',
    },
  }),
  true,
);

/**  graphConfig hook  */
export const useGraphConfig = createGraphConfig((config, getProps) => {
  const { mode = 'edit', registerNodes } = getProps();
  // config.setNodeTypeParser((node) => node?.renderKey);
  // config.setEdgeTypeParser((edge) => edge?.renderKey);
  registerEdge(config);
  registerNode(config, registerNodes);
  config.setX6Config({
    grid: true,
    resizing: {
      enabled: true,
      minWidth: NodeConstants.NODE_HEIGHT,
      minHeight: NodeConstants.NODE_HEIGHT,
      preserveAspectRatio: (shape) => {
        const { data } = shape;
        return data?.name === 'custom-circle';
      },
    },
    snapline: {
      enabled: true,
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
          radius: 2,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        const edge = new XFlowEdge({});
        const graph = this;
        graph.once('edge:connected', (args) => {
          const { edge, isNew } = args;
          if (isNew && edge.isEdge()) {
            const targetNode = edge.getTargetCell();
            if (targetNode && targetNode.isNode()) {
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
        return !!(edge?.target as any)?.port;
      },
      // 是否触发交互事件
      validateMagnet({ magnet }) {
        // 所有锚点均可触发
        return true;
      },
      // 显示可用的链接桩
      validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        // 不允许连接到自己
        if (sourceView === targetView) {
          return false;
        }
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
  const isEdit = mode === 'edit';
  config.setEvents([
    {
      eventName: 'node:click',
      callback: (e, cmds, ctx) => {
        const nodeData: NsGraph.INodeConfig = e?.node?.getData();
        const props = getProps();
        props.handleNodeClick?.(nodeData);
      },
    } as IEvent<'node:click'>,
    {
      eventName: 'node:mouseenter',
      callback: () => {
        isEdit && changePortsVisible(true);
      },
    } as IEvent<'node:mouseenter'>,
    {
      eventName: 'node:mouseleave',
      callback: (e, cmds, ctx) => {
        isEdit && changePortsVisible(false);
      },
    } as IEvent<'node:mouseleave'>,
    {
      eventName: 'node:moved',
      callback: (e, cmds, ctx) => {
        isEdit && movedNode(e, cmds, ctx);
      },
    } as IEvent<'node:moved'>,
    {
      eventName: 'node:resized',
      callback: (e, cmds, ctx) => {
        isEdit && resizeNode(e, cmds, ctx);
      },
    } as IEvent<'node:resized'>,
  ]);
});
