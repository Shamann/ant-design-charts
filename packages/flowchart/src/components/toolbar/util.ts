import { createToolbarConfig } from '@ali/xflow-extension';
import {
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceConstant,
  ContextRegistry,
} from '@ali/xflow-core';
import { NsGraphCmd } from '@ali/xflow-core/es/command-contributions/interface';
import { IToolbarItemProps } from '@ali/xflow-core/es/toolbar/interface';
import { ICommandConfig } from '@ali/xflow-core/es/command/interface';
import { CommandItem } from '../../interface';

interface IToolbarRegistry {
  registerToolbarItem: (params: unknown) => void;
}

const toolbarPool = {
  forward: (registry: IToolbarRegistry, text?: string) => {
    registry.registerToolbarItem({
      ...XFlowNodeCommands.MOVE_NODE,
      type: 'command',
      id: XFlowNodeCommands.MOVE_NODE.id + '_forward',
      command: XFlowNodeCommands.MOVE_NODE.id,
      text: text ?? 'Move Forward',
      cmdOptions: async (item: unknown, contextService: ContextRegistry) => ({
        beforeExec: async function () {
          const ctx = await contextService.useContext<ContextServiceConstant.SELECTED_NODES.IState>(
            ContextServiceConstant.SELECTED_NODES.id,
          );
          const node = ctx.getValue()[0];
          const args = { id: node.id, dx: 100, dy: 50 };
          return [null, args];
        },
      }),
      useContext: async (ctxService: ContextRegistry, setState: any) => {
        const ctx = await ctxService.useContext<ContextServiceConstant.SELECTED_NODES.IState>(
          ContextServiceConstant.SELECTED_NODES.id,
        );
        ctx.onDidChange((nodes) => {
          setState((state: IToolbarItemProps) => {
            state.isEnabled = nodes.length > 0;
          });
        });
      },
    });
  },
  back: (registry: IToolbarRegistry, text?: string) => {
    registry.registerToolbarItem({
      ...XFlowNodeCommands.MOVE_NODE,
      id: XFlowNodeCommands.MOVE_NODE.id + '_back',
      text: text ?? 'Move Back',
      command: XFlowNodeCommands.MOVE_NODE.id,
      cmdOptions: async (item: unknown, contextService: ContextRegistry) => ({
        beforeExec: async function () {
          const ctx = await contextService.useContext<ContextServiceConstant.SELECTED_NODES.IState>(
            ContextServiceConstant.SELECTED_NODES.id,
          );
          const node = ctx.getValue()[0];
          const args = { id: node.id, dx: -100, dy: -50 };
          return [null, args];
        },
      }),
      useContext: async (ctxService: ContextRegistry, setState: any) => {
        const ctx = await ctxService.useContext<ContextServiceConstant.SELECTED_NODES.IState>(
          ContextServiceConstant.SELECTED_NODES.id,
        );
        ctx.onDidChange((nodes) => {
          setState((state: IToolbarItemProps) => {
            state.isEnabled = nodes.length > 0;
          });
        });
      },
    });
  },
  undo: (registry: IToolbarRegistry, text?: string) => {
    registry.registerToolbarItem({
      ...XFlowGraphCommands.UNDO_CMD,
      command: XFlowGraphCommands.UNDO_CMD.id,
      text: text ?? XFlowGraphCommands.UNDO_CMD.label,
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
  },
  redo: (registry: IToolbarRegistry, text?: string) => {
    registry.registerToolbarItem({
      ...XFlowGraphCommands.REDO_CMD,
      command: XFlowGraphCommands.REDO_CMD.id,
      text: text ?? XFlowGraphCommands.REDO_CMD.label,
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
  },
};

// export const useToolbarConfig = (commands: CommandItem[]) => {
//   return createToolbarConfig((toolbarConfig) => {
//     commands.forEach(({ command, text }) => {
//       toolbarConfig.setToolbarItemRegisterFn((registry) => {
//         toolbarPool[command](registry, text);
//       });
//     });

//     // 动态设置 toolbar
//     toolbarConfig.setOptions({
//       mainGroups: [
//         {
//           items: [
//             // XFlowNodeCommands.ADD_NODE.id,
//             // `${XFlowNodeCommands.MOVE_NODE.id}_forward`,
//             // `${XFlowNodeCommands.MOVE_NODE.id}_back`,
//             `${XFlowGraphCommands.REDO_CMD.id}`,
//             `${XFlowGraphCommands.UNDO_CMD.id}`,
//           ],
//         },
//       ],
//     });
//   });
// };

export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */

  toolbarConfig.setToolbarItemRegisterFn((registry) => {
    registry.registerToolbarItem({
      ...XFlowGraphCommands.UNDO_CMD,
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
  });

  // 在当前 toolbar 中消费 toobar item
  // 动态设置 toolbar
  toolbarConfig.setOptions({
    mainGroups: [
      {
        items: [
          // XFlowNodeCommands.ADD_NODE.id,
          // `${XFlowNodeCommands.MOVE_NODE.id}_forward`,
          // `${XFlowNodeCommands.MOVE_NODE.id}_back`,
          `${XFlowGraphCommands.REDO_CMD.id}`,
          `${XFlowGraphCommands.UNDO_CMD.id}`,
        ],
      },
    ],
  });
});
