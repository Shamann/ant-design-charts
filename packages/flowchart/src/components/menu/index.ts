import { useCtxMenuConfig, NsMenuItems } from '@ali/xflow-extension';
import { IMenu, IMenuItem } from '@ali/xflow-core/es/menu/interface';
import {
  XFlowNodeCommands,
  XFlowEdgeCommands,
  ContextServiceConstant,
  ContextServiceUtils,
  NsDelNode,
  NsDelEdge,
  NsGraph,
} from '@ali/xflow-core';
import { Edge, Node } from '@antv/x6';

/** menuitem 配置 */
export namespace NsCustomMenuItems {
  export const DELETE_EDGE: IMenuItem = {
    type: 'command',
    id: XFlowEdgeCommands.DEL_EDGE.id,
    command: XFlowEdgeCommands.DEL_EDGE.id,
    label: '删除边',
    isVisible: true,
    iconName: 'DeleteOutlined', // 需要提前注册
    cmdOptions: async (menuItem, contextService, cmds) => {
      const ctx = await ContextServiceUtils.useContextMenuCell(contextService);
      const cell = ctx.cell as Edge;
      let targetNode: Node;
      if (cell.isEdge()) {
        targetNode = cell.getTargetNode();
      }
      return {
        edgeConfig: { ...cell.getData<NsGraph.IEdgeConfig>(), id: cell.id },
        afterExec: async function ({ afterExecArgs }) {
          /** 设置 target port的样式 */
          if (targetNode && targetNode.isNode()) {
            const targetPortId = cell.getTargetPortId();
            if (targetPortId) {
              targetNode.setPortProp(targetPortId, 'connected', false);
            }
          }
          return [null, { edge: afterExecArgs.edge }];
        },
      } as NsDelEdge.IConfig;
    },
    useContext: async (ctx, setState) => {
      const rxmodel = await ctx.useContext<ContextServiceConstant.CONTEXTMENU_TARGET.IState>(
        ContextServiceConstant.CONTEXTMENU_TARGET.id,
      );
      const { type } = rxmodel.getValue();
      setState((state) => {
        state.isEnabled = ['edge'].includes(type);
      });
    },
  };

  export const DELETE_NODE: IMenuItem = {
    type: 'command',
    id: XFlowNodeCommands.DEL_NODE.id,
    command: XFlowNodeCommands.DEL_NODE.id,
    label: '删除节点',
    isVisible: true,
    iconName: 'DeleteOutlined',
    /** cmdOptions 返回的是 command执行的入参 */
    cmdOptions: async (menuItem, contextService, cmds) => {
      const ctx = await ContextServiceUtils.useContextMenuCell(contextService);
      return { nodeConfig: { id: ctx.cell.id } } as NsDelNode.IConfig;
    },
    useContext: async (ctx, setState) => {
      const target = await ContextServiceUtils.useContextMenuCell(ctx);
      setState((state) => {
        state.isEnabled = ['node'].includes(target.type);
      });
    },
  };
}

export enum MenuEnum {
  DEFAULT = 'DEFAULT_MENU',
  GRAPH = 'GRAPH_MENU',
  NODE = 'NODE_MENU',
  EDGE = 'EDGE_MENU',
}

export namespace NsCutomMenu {
  export const Default: IMenu = {
    id: MenuEnum.DEFAULT,
    items: [NsMenuItems.EMPTY],
  };
  export const NodeMenu: IMenu = {
    id: MenuEnum.NODE,
    items: [NsCustomMenuItems.DELETE_NODE],
  };
  export const EdgeMenu: IMenu = {
    id: MenuEnum.EDGE,
    items: [NsCustomMenuItems.DELETE_EDGE],
  };
  export const GraphMenu: IMenu = {
    id: MenuEnum.GRAPH,
    items: [NsMenuItems.EMPTY],
  };
}

export const useMenuConfig = () => {
  return useCtxMenuConfig((config) => {
    config.setMenuIdParser((data) => {
      try {
        const cell = data.cell;
        if (cell) {
          /** 节点菜单 */
          if (cell.isNode()) {
            const nodeData = cell.getData();
            console.log(nodeData);
            /** 判断节点数据决定返回的menu id */
            return NsCutomMenu.NodeMenu.id;
          }
          /** 边菜单 */
          if (cell.isEdge()) {
            return NsCutomMenu.EdgeMenu.id;
          }
        }
        /** 画布菜单 */
        if (data.type === 'blank') {
          return NsCutomMenu.GraphMenu.id;
        }
        /** 默认菜单 */
        return MenuEnum.DEFAULT;
      } catch (error) {
        return NsCutomMenu.Default.id;
      }
    });
    config.setMenuRegisterFunctions((registry) => {
      /** 默认Menu */
      registry.registerMenu(NsCutomMenu.Default);
      /** Node Menu */
      registry.registerMenu(NsCutomMenu.NodeMenu);
      registry.registerMenuItem(NsCustomMenuItems.DELETE_NODE);
      /** Edge Menu */
      registry.registerMenu(NsCutomMenu.EdgeMenu);
      registry.registerMenuItem(NsCustomMenuItems.DELETE_EDGE);
      /** Graph Menu */
      registry.registerMenu(NsCutomMenu.GraphMenu);
    });
  });
};
