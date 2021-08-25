import React from 'react';
import { ToolbarPanel as XFlowToolbarPanel } from '@ali/xflow-extension';
import { IProps } from '@ali/xflow-extension/es/toolbar-panel/components';
import { useToolbarConfigInstance } from './util';
import { Command } from '../../interface';

export type CommandItem = { command: Command; text?: string };

export interface ToolbarPanelConfig extends Omit<IProps, 'config'> {
  config?: IProps['config'] | Array<CommandItem>;
}

export const ToolbarPanel: React.FC<IProps> = (props) => {
  const {
    config,
    layout = 'horizontal',
    position = { top: 0, left: 290, right: 290, bottom: 0 },
    className,
    style,
  } = props;
  const toolbarConfig = config instanceof Array ? useToolbarConfigInstance(config) : config;
  return (
    <XFlowToolbarPanel
      className={className}
      layout={layout}
      config={toolbarConfig}
      style={{ ...style }}
      position={position}
    />
  );
};

export default ToolbarPanel;
