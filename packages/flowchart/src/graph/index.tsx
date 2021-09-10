import React, { useRef } from 'react';
/** app 核心组件 */
/** app 核心组件 */
import {
  XFlow,
  XFlowCanvas,
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceUtils,
} from '@ali/xflow-core';
import { KeyBindings } from '@ali/xflow-core';
/** app 图缩放组件 */
import {
  ContextMenuPanel,
  CanvasScaleToolbar,
  WorkspacePanel,
  usePanelContext,
  DagGraphExtension,
  FormItemWrapper,
  // NodeTreePanel
} from '@ali/xflow-extension';
import { NodeTreePanel } from '../components/canvas-node-tree-panel';
import { searchService, contextServiceConfig } from '../service';
import { useGraphConfig, keybindingConfig, useGraphHook } from './config';
import { onNodeDrop } from '../command';
import { treeDataService } from '../components/nodePanel';
import { ToolbarPanel } from '../components/toolbar';
// import { CanvasScaleToolbar } from '../components/canvas-scale-toolbar/components';
import { useMenuConfig } from '../components/menu';
import { LightTheme, DarkTheme } from '../theme';
import { useGraph } from '../hooks/useGraph';

import AppContext from '../context';

import { FlowchartConfig } from '../interface';

import './index.less';

export {
  WorkspacePanel,
  XFlowNodeCommands,
  XFlowGraphCommands,
  usePanelContext,
  FormItemWrapper,
  ContextServiceUtils,
};

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  const { onReady, render, className, toolbarConfig, editorPanelConfig } = props;
  const graphConfig = useGraphConfig();
  const menuConfig = useMenuConfig();
  const hookConfig = useGraphHook();
  // const cmdConfig = useCmdConfig();
  const graph = useRef();
  return (
    <AppContext.Provider value={{ theme: LightTheme }}>
      <XFlow
        className={className}
        contextConfig={contextServiceConfig}
        // commandConfig={cmdConfig}
        hookConfig={hookConfig}
        // onAppReadyCallback={(app, registry) => {
        //   onReady?.(useGraph(app, registry), registry);
        // }}
        // meta={{ flowId: 'meta-flow-id' }}
      >
        {toolbarConfig && <ToolbarPanel {...toolbarConfig} />}
        {/* <DagGraphExtension /> */}
        <NodeTreePanel
          searchService={searchService}
          treeDataService={treeDataService}
          onNodeDrop={onNodeDrop}
          position={{ width: 240, top: 0, bottom: 0, left: 0 }}
        />
        <XFlowCanvas config={graphConfig} position={{ top: 40, left: 240, right: 240, bottom: 40 }}>
          <CanvasScaleToolbar position={{ top: 12, right: 12 }} />
          <ContextMenuPanel config={menuConfig} />
        </XFlowCanvas>
        {render && render()}
        <KeyBindings config={keybindingConfig} />
      </XFlow>
    </AppContext.Provider>
  );
};

export default Flowchart;
