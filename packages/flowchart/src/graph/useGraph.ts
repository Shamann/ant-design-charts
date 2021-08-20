import { NsAddNode, NsLoadData, XFlowGraphCommands, XFlowNodeCommands } from '@ali/xflow-core';
import { FrontendApplication } from '@ali/xflow-core/es/xflow-main/application';
import { ExtensionRegistry } from '@ali/xflow-core/es/xflow-main/components/extension-registry';
import { Datum } from '../interface';

interface IGraph {
  __proto__: {
    [key: string]: (params: any) => unknown;
  };
  app: FrontendApplication;
  registry: ExtensionRegistry;
}

/** 向 app 原型上挂载方法，方便上层调用 */
export const useGraph = (app: FrontendApplication, registry: ExtensionRegistry) => {
  // @ts-ignore
  const graph: IGraph = {};
  graph.app = app;
  graph.registry = registry;
  /** 挂载数据 */
  graph.__proto__.loadData = (data: Datum) => {
    app.executeCommand(XFlowGraphCommands.LOAD_DATA.id, {
      beforeExec: async () => {
        const execArgs = {
          loadData: async () => {
            return data as any;
          },
        };
        return [null, execArgs];
      },
    } as NsLoadData.IConfig);
  };
  /** 获取配置 */
  graph.__proto__.getConfig = () => {};
  /** 更新节点 */
  graph.__proto__.addNode = (nodeConfig) => {
    app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
      beforeExec: async () => {
        const execArgs: NsAddNode.IExecArgs = {
          nodeConfig,
        };
        return [null, execArgs];
      },
    } as NsAddNode.IConfig);
  };
  /** 更新节点 */
  graph.__proto__.updateNode = () => {};

  /** 更新边 */
  graph.__proto__.updateEdge = () => {};

  return graph;
};
