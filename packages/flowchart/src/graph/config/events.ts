import { XFlowNodeCommands, IContextService } from '@ali/xflow-core';
import { IGraphCommandService } from '@ali/xflow-core/es/command/interface';
import { NodeView } from '@antv/x6';

/**
 * 节点移动时，实时更新位置信息
 */
export const movedNode = (
  e: NodeView.TranslateEventArgs<any>,
  cmds: IGraphCommandService,
  ctx: IContextService,
) => {
  const { node } = e;
  if (!node) {
    return;
  }
  cmds.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
    nodeConfig: {
      ...node.data,
      ...node.getPosition(),
    },
  });
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

/** 设置 ports visible */
export const changePortsVisible = (visible: boolean) => {
  const container = document.getElementsByClassName('xflow-canvas-root')[0];
  const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = visible ? 'visible' : 'hidden';
  }
};
