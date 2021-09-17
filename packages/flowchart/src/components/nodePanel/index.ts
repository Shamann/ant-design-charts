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
 *           width: NodeConstants.100,
 *           height: 40,
 *           renderKey: NodeConstants.'NODE1',
 *         },
 *       }
 *       return [null, execArgs]
 *     },
 *   } as NsAddNode.IConfig)
 *
 *   return app
 * ```
 */
import { GraphConfig, uuidv4 } from '@ali/xflow-core';
import { getProps } from '../../util';
import AppContext from '../../context';
import * as NodeConstants from './constants';
import * as Nodes from './nodes';

import { FlowchartConfig } from '../../interface';

export { Nodes, NodeConstants, AppContext };

/** 和 graph config 注册的节点保持一致 */
const getAnchorStyle = (position: string) => {
  return {
    position: { name: position },
    attrs: {
      circle: {
        r: 4,
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
      return { group: name, id: uuidv4() };
    }),
    groups: {
      top: getAnchorStyle('top'),
      right: getAnchorStyle('right'),
      bottom: getAnchorStyle('bottom'),
      left: getAnchorStyle('left'),
    },
  };
};

export const getRegisterNodes = () => {
  const { nodes = [] } = (getProps('registerNodes') as FlowchartConfig['registerNodes']) ?? {};
  return nodes.map((item) => {
    const {
      name,
      popover,
      label = '',
      width = NodeConstants.NODE_HEIGHT,
      height = NodeConstants.NODE_HEIGHT,
      ports,
    } = item;
    return {
      id: uuidv4(),
      renderKey: name,
      name: uuidv4(),
      label,
      popoverContent: popover,
      width,
      height,
      ports: ports || getPorts(),
    };
  });
};

export const treeDataService = async () => {
  const customNodes = getRegisterNodes();

  return [
    ...customNodes,
    {
      id: NodeConstants.CONNECTOR_NODE,
      renderKey: NodeConstants.CONNECTOR_NODE,
      name: `custom-${NodeConstants.CONNECTOR_NODE}`,
      label: '',
      popoverContent: Nodes.ConnectorNodePopover,
      width: NodeConstants.NODE_HEIGHT,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.DECISION_NODE,
      renderKey: NodeConstants.DECISION_NODE,
      name: `custom-${NodeConstants.DECISION_NODE}`,
      label: '',
      popoverContent: Nodes.DecisionNodePopover,
      width: NodeConstants.NODE_HEIGHT,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.TERMINATOR_NODE,
      renderKey: NodeConstants.TERMINATOR_NODE,
      name: `custom-${NodeConstants.TERMINATOR_NODE}`,
      label: '',
      popoverContent: Nodes.TerminalNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.DATABASE_NODE,
      renderKey: NodeConstants.DATABASE_NODE,
      name: `custom-${NodeConstants.DATABASE_NODE}`,
      label: '',
      popoverContent: Nodes.DataBaseNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.HARDDISK_NODE,
      renderKey: NodeConstants.HARDDISK_NODE,
      name: `custom-${NodeConstants.HARDDISK_NODE}`,
      label: '',
      popoverContent: Nodes.HardDiskNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.STORED_NODE,
      renderKey: NodeConstants.STORED_NODE,
      name: `custom-${NodeConstants.STORED_NODE}`,
      label: '',
      popoverContent: Nodes.StroedDataNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.DOCUMENT_NODE,
      renderKey: NodeConstants.DOCUMENT_NODE,
      name: `custom-${NodeConstants.DOCUMENT_NODE}`,
      label: '',
      popoverContent: Nodes.DocumentNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.MULTI_DECISION_NODE,
      renderKey: NodeConstants.MULTI_DECISION_NODE,
      name: `custom-${NodeConstants.MULTI_DECISION_NODE}`,
      label: '',
      popoverContent: Nodes.MultiDocumentNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.DATAIO_NODE,
      renderKey: NodeConstants.DATAIO_NODE,
      name: `custom-${NodeConstants.DATAIO_NODE}`,
      label: '',
      popoverContent: Nodes.DataIONodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
    },
    {
      id: NodeConstants.PROCESS_NODE,
      renderKey: NodeConstants.PROCESS_NODE,
      name: `custom-${NodeConstants.PROCESS_NODE}`,
      label: '',
      popoverContent: Nodes.ProcessNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.PREDEFINED_PROCESS_NODE,
      renderKey: NodeConstants.PREDEFINED_PROCESS_NODE,
      name: `custom-${NodeConstants.PREDEFINED_PROCESS_NODE}`,
      label: '',
      popoverContent: Nodes.PredefinedProcessNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
    },
    {
      id: NodeConstants.INDICATRO_NODE,
      renderKey: NodeConstants.INDICATRO_NODE,
      label: '',
      popoverContent: Nodes.IndicatorNodePopover,
      width: NodeConstants.INDICATOR_WIDTH,
      height: NodeConstants.INDICATOR_HEIGHT,
      ports: getPorts(),
      name: 'custom-indicator',
      init: {
        title: 'XXX',
        baseRelative: [
          {
            name: 'xxx',
            value: '',
          },
        ],
      },
    },
  ];
};

export const registerNode = (
  config: GraphConfig,
  registerNodes: FlowchartConfig['registerNodes'],
) => {
  // 自定义节点
  const { nodes = [] } = registerNodes ?? {};
  if (nodes.length) {
    nodes.forEach((item) => {
      const { name, component } = item;
      config.setNodeRender(name, component);
    });
  }
  // 默认节点
  config.setNodeRender(NodeConstants.PROCESS_NODE, Nodes.ProcessNode);
  config.setNodeRender(NodeConstants.DECISION_NODE, Nodes.DecisionNode);
  config.setNodeRender(NodeConstants.CONNECTOR_NODE, Nodes.ConnectorNode);
  config.setNodeRender(NodeConstants.DATAIO_NODE, Nodes.DataIONode);
  config.setNodeRender(NodeConstants.INDICATRO_NODE, Nodes.IndicatorNode);
  config.setNodeRender(NodeConstants.DATABASE_NODE, Nodes.DataBaseNode);
  config.setNodeRender(NodeConstants.TERMINATOR_NODE, Nodes.TerminalNode);
  config.setNodeRender(NodeConstants.HARDDISK_NODE, Nodes.HardDiskNode);
  config.setNodeRender(NodeConstants.STORED_NODE, Nodes.StroedDataNode);
  config.setNodeRender(NodeConstants.DOCUMENT_NODE, Nodes.DocumentNode);
  config.setNodeRender(NodeConstants.PREDEFINED_PROCESS_NODE, Nodes.PredefinedProcessNode);
  config.setNodeRender(NodeConstants.MULTI_DECISION_NODE, Nodes.MultiDocumentNode);

  // DI 节点
  config.setNodeRender(NodeConstants.INDICATRO_NODE, Nodes.IndicatorNode);
};
