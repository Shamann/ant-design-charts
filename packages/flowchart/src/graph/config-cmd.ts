/* eslint-disable @typescript-eslint/no-namespace */
import {
  CommandConfig,
  NsGraphRender,
  NsGraphZoom,
  NsLayout,
  NsLoadData,
  XFlowGraphCommands,
} from '@ali/xflow-core';

import { FrontendApplication } from '@ali/xflow-core/es/xflow-main/application';

import { MockApi } from '../components/menu/service';

export const commandConfig = new CommandConfig();

/** 添加节点 */
commandConfig.setAddNodeCmd({
  async beforeExec(args) {
    const { type } = args.beforeExecArgs;
    const config = await MockApi.addNode(type, args.beforeExecArgs);
    console.log('prepare add node options:', this, config);
    return [
      async () => {
        await MockApi.delNode(config.nodeConfig.id);
      },
      config,
    ];
  },
});

/** 添加边 */
commandConfig.setAddEdgeCmd({
  async beforeExec(args) {
    const { edgeConfig } = args.beforeExecArgs;
    const config = await MockApi.addEdge(edgeConfig);
    return [
      async () => {
        await MockApi.delEdge(config);
      },
      { edgeConfig: config },
    ];
  },
});

/** 查询图的元数据 */
commandConfig.setGraphMetaCmd({
  async beforeExec(args) {
    const meta = await MockApi.queryMeta(args.beforeExecArgs);
    return [null, { meta }];
  },
});

/** 查询图的节点和边的数据 */
export const initGraphCmds = (app: FrontendApplication) => {
  app.executeCommandPipeline([
    /** 1. 从服务端获取数据 */
    {
      commandId: XFlowGraphCommands.LOAD_DATA.id,
      getCommandOption: () => {
        return {
          beforeExec: async () => {
            const execArgs: NsLoadData.IExecArgs = {
              loadData: MockApi.loadGraphData,
            };
            return [null, execArgs];
          },
        };
      },
    },
    /** 2. 执行布局算法 */
    {
      commandId: XFlowGraphCommands.LAYOUT.id,
      getCommandOption: (ctx) => {
        return {
          beforeExec: async () => {
            const commandCtx = await ctx;
            const execArgs: NsLayout.IExecArgs = {
              layoutType: 'dagre',
              layoutOptions: {
                type: 'dagre',
                /** 布局方向 */
                rankdir: 'TB',
                /** 节点间距 */
                nodesep: 60,
                /** 层间距 */
                ranksep: 30,
              },
              graphData: commandCtx?.result?.graphData,
            };
            return [null, execArgs];
          },
        };
      },
    },
    /** 3. 画布内容渲染 */
    {
      commandId: XFlowGraphCommands.GRAPH_RENDER.id,
      getCommandOption: (ctx) => {
        return {
          beforeExec: async () => {
            const commandCtx = await ctx;
            const execArgs: NsGraphRender.IExecArgs = {
              graphData: commandCtx?.result?.graphData,
            };
            return [null, execArgs];
          },
        };
      },
    },
    /** 4. 缩放画布 */
    {
      commandId: XFlowGraphCommands.GRAPH_ZOOM.id,
      getCommandOption: (ctx) => {
        return {
          beforeExec: async () => {
            const execArgs: NsGraphZoom.IExecArgs = {
              factor: 'fit',
            };
            return [null, execArgs];
          },
        };
      },
    },
  ]);
};
