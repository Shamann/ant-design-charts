import { NsAddNode, uuidv4, NsGraph } from '@ali/xflow-core';
import { DND_RENDER_ID, NODE_WIDTH, NODE_HEIGHT } from './constants';

/** mock 后端接口调用 */
export namespace MockApi {
  export const NODE_COMMON_PROPS = {
    renderKey: DND_RENDER_ID,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  } as const;

  /** 查图的meta元信息 */
  export const queryMeta = async (args: any) => {
    console.log('queryMeta', args);
    return { ...args, flowId: args.flowId };
  };
  /** 加载图数据的api */
  export const loadGraphData = async (meta: NsGraph.IGraphMeta) => {
    console.log(meta);
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
  export const saveGraphData = async (meta: NsGraph.IGraphMeta, graphData: NsGraph.IGraphData) => {
    console.log('saveGraphData api', meta, graphData);
    return {
      success: true,
      data: graphData,
    };
  };
  /** 部署图数据的api */
  export const deployServiceFn = async (
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
  export const addNode = async (type: string, beforeExecArgs: NsAddNode.IExecArgs) => {
    const nodeId = beforeExecArgs.nodeConfig.id ? beforeExecArgs.nodeConfig.id : uuidv4();
    /** 这里添加连线桩 */
    const node: NsAddNode.IExecArgs = {
      nodeConfig: {
        width: 190,
        height: 40,
        type,
        ...beforeExecArgs.nodeConfig,
        id: nodeId,
        ports: beforeExecArgs.nodeConfig.ports
          ? beforeExecArgs.nodeConfig.ports
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
      },
    };
    return node;
  };

  /** 更新节点 name，可能依赖接口判断是否重名，返回空字符串时，不更新 */
  export const renameNode = async (name, node) => {
    console.log('rename node', node, name);
    return name;
  };

  /** 删除节点的api */
  export const delNode = async (id: string) => {
    console.info('delNode service running, del node:', id);
  };

  /** 添加边的api */
  export const addEdge = async (edge: NsGraph.IEdgeConfig) => {
    console.info('addEdge service running, add edge:', edge);
    return {
      ...edge,
      id: uuidv4(),
    };
  };

  /** 删除边的api */
  export const delEdge = async (edge: NsGraph.IEdgeConfig) => {
    console.info('addEdge service running, add edge:', edge);
    return {
      ...edge,
      id: uuidv4(),
      succcess: true,
    };
  };
}
