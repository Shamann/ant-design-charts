import { XFlowNodeCommands, IContextService } from '@ali/xflow-core';
import { IGraphCommandService } from '@ali/xflow-core/es/command/interface';
import { NodeView } from '@antv/x6';

/**
 * 节点移动时，实时更新位置信息
 */
export const moveNode = () => {
  const startPosition = {
    x: 0,
    y: 0,
  };
  // 开始移动
  const move = (
    e: NodeView.TranslateEventArgs<any>,
    cmds: IGraphCommandService,
    ctx: IContextService,
  ) => {
    const { x, y, node } = e;
    if (!node) {
      return;
    }
    startPosition.x = x;
    startPosition.y = y;
  };

  // 移动结束
  const moved = (
    e: NodeView.TranslateEventArgs<any>,
    cmds: IGraphCommandService,
    ctx: IContextService,
  ) => {
    const { x, y, node } = e;
    if (!node) {
      return;
    }
    const diffX = x - startPosition.x;
    const diffY = y - startPosition.y;
    const { x: originX, y: originY } = node.data ?? {};
    cmds.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
      nodeConfig: {
        ...node.data,
        x: originX + diffX,
        y: originY + diffY,
      },
    });
  };

  return { move, moved };
};

/**
 * 修改节点大小
 */
export const resizeNode = (
  e: NodeView.TranslateEventArgs<any>,
  cmds: IGraphCommandService,
  ctx: IContextService,
) => {
  const { node } = e;
  if (!node) {
    return;
  }
  const { width, height } = node.size();
  cmds.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
    nodeConfig: {
      ...node.data,
      width,
      height,
    },
  });
};
