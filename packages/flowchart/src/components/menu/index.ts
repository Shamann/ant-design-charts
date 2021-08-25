import { createCtxMenuConfig, NsMenuItems } from '@ali/xflow-extension';
import { NsNodeCmd, NsEdgeCmd, ICommandConfig } from '@ali/xflow-core';
import { IMenu, IMenuItem, MenuItemType } from '@ali/xflow-core/es/menu/interface';
import {
  IconStore,
  XFlowNodeCommands,
  XFlowEdgeCommands,
  ContextServiceUtils,
  NsGraph,
} from '@ali/xflow-core';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Edge, Node } from '@antv/x6';
import { CustomCommands } from './constants';
import { MockApi } from './service';

/** menuitem 配置 */
export namespace NsCustomMenuItems {
  /** 注册菜单依赖的icon */
  IconStore.set('DeleteOutlined', DeleteOutlined);
  IconStore.set('EditOutlined', EditOutlined);

  export const DELETE_EDGE: IMenuItem = {
    id: XFlowEdgeCommands.DEL_EDGE.id,
    type: MenuItemType.command,
    command: XFlowEdgeCommands.DEL_EDGE.id,
    label: '删除边',
    isVisible: true,
    iconName: 'DeleteOutlined',
    cmdOptions: async (menuItem, contextService, cmds) => {
      const ctx = await ContextServiceUtils.useContextMenuCell(contextService);
      const cell = ctx.cell as Edge;
      let targetNode: Node;
      if (cell.isEdge()) {
        targetNode = cell.getTargetNode();
      }
      return {
        args: {
          edgeConfig: { ...cell.getData<NsGraph.IEdgeConfig>(), id: cell.id },
        },
      } as ICommandConfig<NsEdgeCmd.DelEdge.IArgs>;
    },
    useContext: async (ctx, setState) => {
      const rxmodel = await ContextServiceUtils.useContextMenuModel(ctx);
      const { type } = await rxmodel.getValidValue();
      setState((state) => {
        state.isEnabled = ['edge'].includes(type);
      });
    },
  };

  export const DELETE_NODE: IMenuItem = {
    id: XFlowNodeCommands.DEL_NODE.id,
    type: MenuItemType.command,
    command: XFlowNodeCommands.DEL_NODE.id,
    label: '删除节点',
    isVisible: true,
    iconName: 'DeleteOutlined',
    /** cmdOptions 返回的是 command执行的入参 */
    cmdOptions: async (menuItem, contextService, cmds) => {
      const ctx = await ContextServiceUtils.useContextMenuCell(contextService);
      return {
        args: { nodeConfig: { id: ctx.cell.id } },
      } as ICommandConfig<NsNodeCmd.AddNode.IArgs>;
    },
    useContext: async (ctx, setState) => {
      const target = await ContextServiceUtils.useContextMenuCell(ctx);
      setState((state) => {
        state.isEnabled = ['node'].includes(target.type);
      });
    },
  };

  export const RENAME_NODE: IMenuItem = {
    id: CustomCommands.SHOW_RENAME_MODAL.id,
    command: CustomCommands.SHOW_RENAME_MODAL.id,
    type: MenuItemType.command,
    label: '重命名',
    isVisible: true,
    iconName: 'EditOutlined',
    /** cmdOptions 返回的是 command执行的入参 */
    cmdOptions: async (menuItem, contextService, cmds) => {
      const ctx = await ContextServiceUtils.useContextMenuCell(contextService);
      return {
        args: {
          nodeConfig: { id: ctx.cell.id, ...ctx.cell.getData<NsGraph.INodeConfig>() },
          updateNodeNameService: MockApi.renameNode,
        },
      };
    },
    useContext: async (ctx, setState) => {
      const target = await ContextServiceUtils.useContextMenuCell(ctx);
      setState((state) => {
        state.isEnabled = ['node'].includes(target.type);
      });
    },
  };

  export const SEPARATOR: IMenuItem = {
    id: 'separator',
    type: MenuItemType.separator,
    command: '',
    label: '',
    iconName: '',
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
    items: [NsCustomMenuItems.DELETE_NODE, NsCustomMenuItems.RENAME_NODE],
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

export const useMenuConfig = createCtxMenuConfig((config) => {
  config.setMenuIdParser((data) => {
    try {
      console.log('setMenuIdParser', data);
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
    registry.registerMenuItem(NsCustomMenuItems.RENAME_NODE);
    /** Edge Menu */
    registry.registerMenu(NsCutomMenu.EdgeMenu);
    registry.registerMenuItem(NsCustomMenuItems.DELETE_EDGE);
    /** Graph Menu */
    registry.registerMenu(NsCutomMenu.GraphMenu);
  });
});
