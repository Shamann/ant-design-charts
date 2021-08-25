import React from 'react';
/** app 核心组件 */
/** app 核心组件 */
import { XFlow, XFlowCanvas, XFlowNodeCommands, XFlowGraphCommands } from '@ali/xflow-core';
import { KeyBindings } from '@ali/xflow-core';
/** app 图缩放组件 */
import {
  ContextMenuPanel,
  CanvasScaleToolbar,
  WorkspacePanel,
  NodeTreePanel,
  usePanelContext,
  DagGraphExtension,
} from '@ali/xflow-extension';
import { searchService, contextServiceConfig } from '../service';
import { useGraphConfig, keybindingConfig, useGraphHook } from './config';
import { onNodeDrop, useCmdConfig } from '../command';
import { treeDataService } from '../components/nodePanel';
import { useMenuConfig } from '../components/menu';

import { FlowchartConfig } from '../interface';

export { WorkspacePanel, XFlowNodeCommands, XFlowGraphCommands, usePanelContext };

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  const { onReady, render, className, meta = { flowId: 'meta-flow-id' } } = props;
  const graphConfig = useGraphConfig();
  const menuConfig = useMenuConfig();
  const hookConfig = useGraphHook();
  const cmdConfig = useCmdConfig();

  return (
    <XFlow
      className={className}
      contextConfig={contextServiceConfig}
      commandConfig={cmdConfig}
      hookConfig={hookConfig}
      onAppReadyCallback={onReady}
      meta={meta}
    >
      <DagGraphExtension />
      <NodeTreePanel
        searchService={searchService}
        treeDataService={treeDataService}
        onNodeDrop={onNodeDrop}
        position={{ width: 290, top: 0, bottom: 0, left: 0 }}
      />
      <XFlowCanvas config={graphConfig} position={{ top: 40, left: 290, right: 290, bottom: 40 }}>
        <CanvasScaleToolbar position={{ top: 12, right: 12 }} />
        <ContextMenuPanel config={menuConfig} />
      </XFlowCanvas>
      {render && render()}
      <KeyBindings config={keybindingConfig} />
    </XFlow>
  );
};

export default Flowchart;
