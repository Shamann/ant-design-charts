import { RECT_NODE, NODE_WIDTH, NODE_HEIGHT } from '../components/nodePanel';
import { uuidv4, NsGraph } from '@ali/xflow-core';
import {
  NsNodeCmd,
  NsEdgeCmd,
  NsGraphCmd,
} from '@ali/xflow-core/es/command-contributions/interface';
/** mock 后端接口调用 */
export namespace MockApi {
  export const NODE_COMMON_PROPS = {
    renderKey: RECT_NODE,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  } as const;

  /** 查图的meta元信息 */
  export const queryGraphMeta: NsGraphCmd.GraphMeta.IArgs['graphMetaService'] = async (args) => {
    console.log('queryMeta', args);
    return { ...args, flowId: args.flowId };
  };
  /** 加载图数据的api */
  export const loadGraphData = async (meta: NsGraph.IGraphMeta) => {
    const nodes: NsGraph.INodeConfig[] = [
      {
        ...NODE_COMMON_PROPS,
        id: 'node1',
        label: '算法节点-1',
        ports: {
          items: [
            {
              id: 'node1-input-1',
              type: NsGraph.AnchorType.INPUT,
              group: NsGraph.AnchorGroup.TOP,
              tooltip: '输入桩',
            },
            {
              id: 'node1-output-1',
              type: NsGraph.AnchorType.OUTPUT,
              group: NsGraph.AnchorGroup.BOTTOM,
              tooltip: '输出桩',
            },
          ] as NsGraph.INodeAnchor[],
        },
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node2',
        label: '算法节点-2',
        ports: {
          items: [
            {
              id: 'node2-input-1',
              type: NsGraph.AnchorType.INPUT,
              group: NsGraph.AnchorGroup.TOP,
              tooltip: '输入桩',
              connected: true,
            },
            {
              id: 'node2-output-1',
              type: NsGraph.AnchorType.OUTPUT,
              group: NsGraph.AnchorGroup.BOTTOM,
              tooltip: '输出桩',
            },
          ] as NsGraph.INodeAnchor[],
        },
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node3',
        label: '算法节点-3',
        ports: {
          items: [
            {
              id: 'node3-input-1',
              type: NsGraph.AnchorType.INPUT,
              group: NsGraph.AnchorGroup.TOP,
              tooltip: '输入桩',
              connected: true,
            },
            {
              id: 'node3-output-1',
              type: NsGraph.AnchorType.OUTPUT,
              group: NsGraph.AnchorGroup.BOTTOM,
              tooltip: '输出桩',
            },
          ] as NsGraph.INodeAnchor[],
        },
      },
      {
        ...NODE_COMMON_PROPS,
        id: 'node4',
        label: '算法节点-4',
        ports: {
          items: [
            {
              id: 'node4-input-1',
              type: NsGraph.AnchorType.INPUT,
              group: NsGraph.AnchorGroup.TOP,
              tooltip: '输入桩',
              connected: true,
            },
            {
              id: 'node4-output-1',
              type: NsGraph.AnchorType.OUTPUT,
              group: NsGraph.AnchorGroup.BOTTOM,
              tooltip: '输出桩',
            },
          ] as NsGraph.INodeAnchor[],
        },
      },
    ];
    const edges: NsGraph.IEdgeConfig[] = [
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node2',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node2-input-1',
      },
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node3',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node3-input-1',
      },
      {
        id: uuidv4(),
        source: 'node1',
        target: 'node4',
        sourcePortId: 'node1-output-1',
        targetPortId: 'node4-input-1',
      },
    ];
    return { nodes, edges };
  };
  /** 保存图数据的api */
  export const saveGraphData: NsGraphCmd.SaveGraphData.IArgs['saveGraphDataService'] = async (
    meta: NsGraph.IGraphMeta,
    graphData: NsGraph.IGraphData,
  ) => {
    console.log('saveGraphData api', meta, graphData);
    return {
      success: true,
      data: graphData,
    };
  };
  /** 部署图数据的api */
  export const deployDagService = async (
    meta: NsGraph.IGraphMeta,
    graphData: NsGraph.IGraphData,
  ) => {
    console.log('deployService api', meta, graphData);
    return {
      success: true,
      data: graphData,
    };
  };

  /** 添加节点api */
  export const addNode: NsNodeCmd.AddNode.IArgs['createNodeService'] = async (
    args: NsNodeCmd.AddNode.IArgs,
  ) => {
    const { id, ports } = args.nodeConfig;
    const nodeId = id || uuidv4();
    /** 这里添加连线桩 */ args;
    const node: NsNodeCmd.AddNode.IArgs['nodeConfig'] = {
      width: 190,
      height: 40,
      ...args.nodeConfig,
      id: nodeId,
      ports: ports
        ? ports
        : {
            items: [
              {
                id: uuidv4(),
                type: NsGraph.AnchorType.INPUT,
                group: NsGraph.AnchorGroup.TOP,
                tooltip: '输入桩',
              },
              {
                id: uuidv4(),
                type: NsGraph.AnchorType.OUTPUT,
                group: NsGraph.AnchorGroup.BOTTOM,
                tooltip: '输出桩',
              },
            ] as NsGraph.INodeAnchor[],
          },
    };
    return node;
  };

  /** 更新节点 name，可能依赖接口判断是否重名，返回空字符串时，不更新 */
  export const renameNode = (
    newName: string,
    nodeConfig: NsGraph.INodeConfig,
    meta: NsGraph.IGraphMeta,
  ): Promise<{
    err: string | null;
    nodeName: string;
  }> => {
    console.log('rename node', node, name, graphMeta);
    return { err: null, nodeName: name };
  };

  /** 删除节点的api */
  export const delNode: NsNodeCmd.DelNode.IArgs['deleteNodeService'] = async (args) => {
    console.info('delNode service running, del node:', args.nodeConfig.id);
    return true;
  };

  /** 添加边的api */
  export const addEdge: NsEdgeCmd.AddEdge.IArgs['createEdgeService'] = async (args) => {
    console.info('addEdge service running, add edge:', args);
    const { edgeConfig } = args;
    return {
      ...edgeConfig,
      id: uuidv4(),
    };
  };

  /** 删除边的api */
  export const delEdge: NsEdgeCmd.DelEdge.IArgs['deleteEdgeService'] = async (args) => {
    console.info('addEdge service running, add edge:', args);
    const { edgeConfig } = args;
    return true;
  };
}
