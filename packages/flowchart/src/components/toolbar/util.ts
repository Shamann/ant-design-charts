/**
 * 根据用户配置的 command 注册相关事件
 *
 */

import { useToolbarConfig } from '@ali/xflow-extension';
import {
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceConstant,
  ContextRegistry,
} from '@ali/xflow-core';
import { IToolbarItemProps } from '@ali/xflow-core/es/toolbar/interface';
import { CommandItem } from './index';

interface IToolbarRegistry {
  registerToolbarItem: (params: unknown) => void;
}

const ToolbarPool = {
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
      cmdOptions: async () => ({}),
    });
  },
  redo: (registry: IToolbarRegistry, text?: string) => {
    registry.registerToolbarItem({
      ...XFlowGraphCommands.REDO_CMD,
      command: XFlowGraphCommands.REDO_CMD.id,
      text: text ?? XFlowGraphCommands.REDO_CMD.label,
      cmdOptions: async () => ({}),
    });
  },
};

export const useToolbarConfigInstance = (commands: CommandItem[]) => {
  return useToolbarConfig((toolbarConfig) => {
    commands.forEach(({ command, text }) => {
      toolbarConfig.setToolbarItemRegisterFn((registry) => {
        ToolbarPool[command](registry, text);
      });
    });
    // 动态调整
    toolbarConfig.setOptions({
      mainGroups: [
        {
          items: [
            XFlowNodeCommands.ADD_NODE.id,
            `${XFlowNodeCommands.MOVE_NODE.id}_forward`,
            `${XFlowNodeCommands.MOVE_NODE.id}_back`,
            `${XFlowGraphCommands.REDO_CMD.id}`,
            `${XFlowGraphCommands.UNDO_CMD.id}`,
          ],
        },
      ],
    });
  });
};
