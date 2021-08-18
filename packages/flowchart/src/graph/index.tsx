import React from 'react';
/** app 核心组件 */
import { XFlow, XFlowCanvas } from '@ali/xflow-core';
import { KeyBindings } from '@ali/xflow-core';
import { IAppReadyCallback } from '@ali/xflow-core';
/** app 图缩放组件 */
import {
  ContextMenuPanel,
  ToolbarPanel,
  CanvasScaleToolbar,
  WorkspacePanel,
  NodeTreePanel,
} from '@ali/xflow-extension';
import { useGraphConfig } from './graph';

import { useMenuConfig } from '../components/menu';

import { FlowchartConfig } from '../interface';

export { WorkspacePanel };

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  const { onReady, render, className, contextServiceConfig, commandConfig, graphPlugins } = props;
  const graphConfig = useGraphConfig();
  const menuConfig = useMenuConfig();

  return (
    <XFlow className={className} graphPluginConfig={graphPlugins} onAppReadyCallback={onReady}>
      <XFlowCanvas config={graphConfig} position={{ top: 40, left: 290, right: 290, bottom: 40 }}>
        <CanvasScaleToolbar position={{ top: 12, right: 12 }} />
        <ContextMenuPanel config={menuConfig} />
      </XFlowCanvas>
      {render && render()}
    </XFlow>
  );
};

export default Flowchart;
