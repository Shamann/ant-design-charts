import { createToolbarConfig } from '@ali/xflow-extension';
import {
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceConstant,
  ContextRegistry,
  IconStore,
  ContextServiceUtils,
  NsGraph,
  NsNodeCmd,
} from '@ali/xflow-core';
import { NsGraphCmd } from '@ali/xflow-core/es/command-contributions/interface';
import { IToolbarItemProps } from '@ali/xflow-core/es/toolbar/interface';
import { ICommandConfig } from '@ali/xflow-core/es/command/interface';
import {
  SaveOutlined,
  RedoOutlined,
  RollbackOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
export namespace TOOLBAR_ITEMS {
  export const SAVE = XFlowGraphCommands.SAVE_GRAPH_DATA.id;
  export const REDO = `${XFlowGraphCommands.REDO_CMD.id}`;
  export const UNDO = `${XFlowGraphCommands.UNDO_CMD.id}`;
  export const MOVE_BACK = `${XFlowNodeCommands.MOVE_NODE.id}_back`;
  export const MOVE_FORWARD = `${XFlowNodeCommands.MOVE_NODE.id}_forward`;
}

export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarItemRegisterFn((registry) => {
    /** 注册icon 类型 */
    IconStore.set('SaveOutlined', SaveOutlined);
    IconStore.set('RollbackOutlined', RollbackOutlined);
    IconStore.set('RedoOutlined', RedoOutlined);
    IconStore.set('BackwardOutlined', BackwardOutlined);
    IconStore.set('ForwardOutlined', ForwardOutlined);

    registry.registerToolbarItem({
      ...XFlowGraphCommands.UNDO_CMD,
      iconName: 'RollbackOutlined',
      command: XFlowGraphCommands.UNDO_CMD.id,
      text: XFlowGraphCommands.UNDO_CMD.label,
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
    registry.registerToolbarItem({
      ...XFlowGraphCommands.REDO_CMD,
      iconName: 'RedoOutlined',
      command: XFlowGraphCommands.REDO_CMD.id,
      text: XFlowGraphCommands.REDO_CMD.label,
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

    /** 保存数据toolbar按钮 */
    registry.registerToolbarItem({
      iconName: 'SaveOutlined',
      id: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      text: XFlowGraphCommands.SAVE_GRAPH_DATA.label,
      command: XFlowGraphCommands.SAVE_GRAPH_DATA.id,
      /** cmdOptions 返回的是 command执行的入参 */
      cmdOptions: async (item, contextService) => {
        return {
          args: {
            saveGraphDataService: (meta, graphData) => {
              console.log(graphData?.edges);
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
    registry.registerToolbarItem({
      id: TOOLBAR_ITEMS.MOVE_FORWARD,
      iconName: 'ForwardOutlined',
      command: XFlowNodeCommands.MOVE_NODE.id,
      text: '置前',
      cmdOptions: async (item, contextService) => {
        const { data } = await ContextServiceUtils.useSelectedNode<NsGraph.INodeConfig>(
          contextService,
        );
        const nodeId = data?.id || '-1';
        return {
          args: {
            id: nodeId,
            position: { dx: 50, dy: 100 },
          },
        } as ICommandConfig<NsNodeCmd.MoveNode.IArgs>;
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
    registry.registerToolbarItem({
      id: TOOLBAR_ITEMS.MOVE_BACK,
      iconName: 'BackwardOutlined',
      text: '置后',
      command: XFlowNodeCommands.MOVE_NODE.id,
      cmdOptions: async (item, contextService) => {
        const { data } = await ContextServiceUtils.useSelectedNode<NsGraph.INodeConfig>(
          contextService,
        );
        const nodeId = data?.id || '-1';
        return {
          args: {
            id: nodeId,
            position: { dx: -50, dy: -100 },
          },
        } as ICommandConfig<NsNodeCmd.MoveNode.IArgs>;
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
          TOOLBAR_ITEMS.MOVE_FORWARD,
          TOOLBAR_ITEMS.MOVE_BACK,
        ],
      },
    ],
  });
});
