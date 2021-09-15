import { createToolbarConfig } from '@ali/xflow-extension';
import {
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceConstant,
  ContextRegistry,
  ContextServiceUtils,
  NsGraph,
} from '@ali/xflow-core';
import { NsGraphCmd } from '@ali/xflow-core/es/command-contributions/interface';
import { IToolbarItemProps } from '@ali/xflow-core/es/toolbar/interface';
import { ICommandConfig } from '@ali/xflow-core/es/command/interface';
import { getProps } from '../../util';

export namespace TOOLBAR_ITEMS {
  export const BACK_NODE = XFlowNodeCommands.BACK_NODE.id;
  export const FRONT_NODE = XFlowNodeCommands.FRONT_NODE.id;
  export const SAVE = XFlowGraphCommands.SAVE_GRAPH_DATA.id;
  export const REDO = `${XFlowGraphCommands.REDO_CMD.id}`;
  export const UNDO = `${XFlowGraphCommands.UNDO_CMD.id}`;
}

export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarItemRegisterFn((registry) => {
    const { config = [] } = getProps('toolbarConfig');
    const getIconName = (commandName: string) => {
      return config.find(
        (item: { command: string; iconName: string }) => item.command === commandName,
      );
    };
    /** 撤销 */
    registry.registerToolbarItem({
      ...getIconName('undo'),
      id: TOOLBAR_ITEMS.UNDO,
      command: TOOLBAR_ITEMS.UNDO,
      cmdOptions: async () => ({} as ICommandConfig<NsGraphCmd.UndoCmd.IArgs>),
      useContext: async (ctxService: ContextRegistry, setState: any) => {
        const ctx = await ctxService.useContext<ContextServiceConstant.COMMAND_UNDOABLE.IState>(
          ContextServiceConstant.COMMAND_UNDOABLE.id,
        );
        ctx.onDidChange((bool) => {
          setState((state: IToolbarItemProps) => {
            state.isEnabled = bool;
          });
        });
      },
    });
    /** 重做 */
    registry.registerToolbarItem({
      ...getIconName('redo'),
      id: TOOLBAR_ITEMS.REDO,
      command: TOOLBAR_ITEMS.REDO,
      cmdOptions: async () => ({} as ICommandConfig<NsGraphCmd.RedoCmd.IArgs>),
      useContext: async (ctxService: ContextRegistry, setState: any) => {
        const ctx = await ctxService.useContext<ContextServiceConstant.COMMAND_REDOABLE.IState>(
          ContextServiceConstant.COMMAND_REDOABLE.id,
        );
        ctx.onDidChange((bool) => {
          setState((state: IToolbarItemProps) => {
            state.isEnabled = bool;
          });
        });
      },
    });
    /** 保存数据 */
    registry.registerToolbarItem({
      ...getIconName('save'),
      id: TOOLBAR_ITEMS.SAVE,
      command: TOOLBAR_ITEMS.SAVE,
      /** cmdOptions 返回的是 command执行的入参 */
      cmdOptions: async (item, contextService) => {
        return {
          args: {
            saveGraphDataService: (meta, graphData) => {
              console.log(JSON.stringify(graphData));
            },
          },
        } as ICommandConfig<NsGraphCmd.SaveGraphData.IArgs>;
      },
      useContext: async (ctxService, setState) => {
        /** 有meta数据才显示可用 */
        const ctx = await ctxService.useContext<ContextServiceConstant.GRAPH_META.IState>(
          ContextServiceConstant.GRAPH_META.id,
        );
        const meta = await ctx.getValidValue();
        console.log(meta, 'meta');

        if (meta.flowId) {
          setState((state) => {
            state.isEnabled = true;
          });
        }
        ctx.onDidChange((data) => {
          setState((state) => {
            state.isEnabled = true;
          });
        });
      },
    });
    /** 前置 */
    registry.registerToolbarItem({
      ...getIconName('front'),
      id: TOOLBAR_ITEMS.FRONT_NODE,
      command: TOOLBAR_ITEMS.FRONT_NODE,
      cmdOptions: async (item, contextService) => {
        const { data } = await ContextServiceUtils.useSelectedNode<NsGraph.INodeConfig>(
          contextService,
        );
        const nodeId = data?.id || '-1';
        return {
          args: {
            nodeId,
          },
        };
      },
      useContext: async (ctxService, setState) => {
        const ctx = await ctxService.useContext<ContextServiceConstant.SELECTED_NODES.IState>(
          ContextServiceConstant.SELECTED_NODES.id,
        );
        ctx.onDidChange((nodes) => {
          setState((state) => {
            state.isEnabled = nodes.length > 0;
          });
        });
      },
    });
    /** 后置 */
    registry.registerToolbarItem({
      ...getIconName('back'),
      id: TOOLBAR_ITEMS.BACK_NODE,
      command: TOOLBAR_ITEMS.BACK_NODE,
      cmdOptions: async (item, contextService) => {
        const { data } = await ContextServiceUtils.useSelectedNode<NsGraph.INodeConfig>(
          contextService,
        );
        const nodeId = data?.id || '-1';
        return {
          args: {
            nodeId,
          },
        };
      },
    });
  });

  // 动态设置 toolbar
  toolbarConfig.setOptions({
    mainGroups: [
      {
        items: [
          TOOLBAR_ITEMS.SAVE,
          TOOLBAR_ITEMS.REDO,
          TOOLBAR_ITEMS.UNDO,
          TOOLBAR_ITEMS.FRONT_NODE,
          TOOLBAR_ITEMS.BACK_NODE,
        ],
      },
    ],
  });
});
