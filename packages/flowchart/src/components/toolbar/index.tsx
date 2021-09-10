import React from 'react';
import { ToolbarPanel as XFlowToolbarPanel } from '@ali/xflow-extension';
// import { ToolbarPanel as XFlowToolbarPanel } from '../toolbar-panel/components';
import { useToolbarConfig } from './util';
import { ToolbarPanelConfig } from '../../interface';

export const ToolbarPanel: React.FC<ToolbarPanelConfig> = (props) => {
  const {
    config = [
      {
        command: 'redo',
        text: '重做',
      },
      {
        command: 'undo',
        text: '撤销',
      },
      {
        command: 'forward',
        text: '置前',
      },
      {
        command: 'back',
        text: '置后',
      },
    ],
    layout = 'horizontal',
    position = { top: 0, left: 240, right: 240, bottom: 0 },
    className,
    style,
  } = props;
  const toolbarConfig = config instanceof Array ? useToolbarConfig(config) : config;
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
