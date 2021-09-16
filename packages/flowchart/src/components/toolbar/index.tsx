import React from 'react';
import { ToolbarPanel as XFlowToolbarPanel } from '@ali/xflow-extension';
import { useToolbarConfig } from './util';
import { CommandPool } from './constants';
import { ToolbarPanelConfig } from '../../interface';

export const ToolbarPanel: React.FC<ToolbarPanelConfig> = (props) => {
  const {
    config = [
      {
        command: CommandPool.REDO_CMD,
        text: '重做',
      },
      {
        command: CommandPool.UNDO_CMD,
        text: '撤销',
      },
      {
        command: CommandPool.FRONT_NODE,
        text: '置前',
      },
      {
        command: CommandPool.BACK_NODE,
        text: '置后',
      },
      {
        command: CommandPool.SAVE_GRAPH_DATA,
        text: '保存',
      },
    ],
    layout = 'horizontal',
    position = { top: 0, left: 240, right: 240, bottom: 0 },
    className,
    style,
  } = props;
  const toolbarConfig = config instanceof Array ? useToolbarConfig() : config;

  return (
    <XFlowToolbarPanel
      className={className}
      layout={layout}
      config={toolbarConfig}
      style={{ borderBottom: '1px solid #ccc', ...style }}
      position={position}
    />
  );
};

export default ToolbarPanel;
