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

import {
  ProcessNodePopover,
  DecisionNodePopover,
  ConnectorNodePopover,
  DataIONodePopover,
  IndicatorNodePopover,
  TerminalNodePopover,
  DataBaseNodePopover,
} from './nodes';
import {
  PROCESS_NODE,
  DECISION_NODE,
  CONNECTOR_NODE,
  DATAIO_NODE,
  NODE_WIDTH,
  NODE_HEIGHT,
  INDICATRO_NODE,
  INDICATOR_WIDTH,
  INDICATOR_HEIGHT,
  DATABASE_NODE,
  TERMINATOR_NODE,
} from './constants';

import AppContext from '../../context';

export { AppContext };

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

export const treeDataService = async () => {
  return [
    {
      id: 'connector',
      label: '',
      renderKey: CONNECTOR_NODE,
      popoverContent: ConnectorNodePopover,
      width: NODE_HEIGHT,
      height: NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-connector',
    },
    {
      id: 'decision',
      label: '',
      renderKey: DECISION_NODE,
      popoverContent: DecisionNodePopover,
      width: NODE_HEIGHT,
      height: NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
      name: 'custom-decision',
    },
    {
      id: 'terminator',
      label: '',
      renderKey: TERMINATOR_NODE,
      popoverContent: TerminalNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-terminator',
    },
    {
      id: 'database',
      label: '',
      renderKey: DATABASE_NODE,
      popoverContent: DataBaseNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-database',
    },
    {
      id: 'dataIO',
      label: '',
      renderKey: DATAIO_NODE,
      popoverContent: DataIONodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(['top', 'bottom']),
      name: 'custom-dataIO',
    },
    {
      id: 'process',
      label: '',
      renderKey: PROCESS_NODE,
      popoverContent: ProcessNodePopover,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      ports: getPorts(),
      name: 'custom-process',
    },
    // {
    //   id: 'indicator',
    //   label: 'indicator',
    //   renderKey: INDICATRO_NODE,
    //   popoverContent: IndicatorNodePopover,
    //   width: INDICATOR_WIDTH,
    //   height: INDICATOR_HEIGHT,
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
