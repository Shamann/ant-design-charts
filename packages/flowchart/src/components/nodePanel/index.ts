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

import AppContext from '../../context';
import * as NodeConstants from './constants';
import * as Nodes from './nodes';

export { Nodes, NodeConstants, AppContext };

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

export const treeDataService = async () => {
  return [
    {
      id: 'connector',
      label: '',
      renderKey: NodeConstants.CONNECTOR_NODE,
      popoverContent: Nodes.ConnectorNodePopover,
      width: NodeConstants.NODE_HEIGHT,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-connector',
    },
    {
      id: 'decision',
      label: '',
      renderKey: NodeConstants.DECISION_NODE,
      popoverContent: Nodes.DecisionNodePopover,
      width: NodeConstants.NODE_HEIGHT,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-decision',
    },
    {
      id: 'terminator',
      label: '',
      renderKey: NodeConstants.TERMINATOR_NODE,
      popoverContent: Nodes.TerminalNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-terminator',
    },
    {
      id: 'database',
      label: '',
      renderKey: NodeConstants.DATABASE_NODE,
      popoverContent: Nodes.DataBaseNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-database',
    },
    {
      id: 'hard-disk',
      label: '',
      renderKey: NodeConstants.HARDDISK_NODE,
      popoverContent: Nodes.HardDiskNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-hard-disk',
    },
    {
      id: 'stored-data',
      label: '',
      renderKey: NodeConstants.STORED_NODE,
      popoverContent: Nodes.StroedDataNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-stored-data',
    },
    {
      id: 'document',
      label: '',
      renderKey: NodeConstants.DOCUMENT_NODE,
      popoverContent: Nodes.DocumentNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-document',
    },
    {
      id: 'dataIO',
      label: '',
      renderKey: NodeConstants.DATAIO_NODE,
      popoverContent: Nodes.DataIONodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
      name: 'custom-dataIO',
    },
    {
      id: 'process',
      label: '',
      renderKey: NodeConstants.PROCESS_NODE,
      popoverContent: Nodes.ProcessNodePopover,
      width: NodeConstants.NODE_WIDTH,
      height: NodeConstants.NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-process',
    },
    // {
    //   id: 'indicator',
    //   label: 'indicator',
    //   renderKey: NodeConstants.INDICATRO_NODE,
    //   popoverContent: Nodes.IndicatorNodePopover,
    //   width: NodeConstants.INDICATOR_WIDTH,
    //   height: NodeConstants.INDICATOR_HEIGHT,
    //   ports: getPorts(),
    //   name: 'custom-indicator',
    //   init: {
    //     title: 'XXX',
    //     baseRelative: [
    //       {
    //         name: 'xxx',
    //         value: '',
    //       },
    //     ],
    //   },
    // },
  ];
};
