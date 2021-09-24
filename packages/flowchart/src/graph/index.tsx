import React, { useRef, memo } from 'react';
/** app 核心组件 */
/** app 核心组件 */
import {
  XFlow,
  XFlowCanvas,
  XFlowNodeCommands,
  XFlowGraphCommands,
  ContextServiceUtils,
  NsGraphCmd,
  NsGraph,
} from '@ali/xflow-core';
import { KeyBindings } from '@ali/xflow-core';
/** app 图缩放组件 */
import {
  CanvasScaleToolbar,
  WorkspacePanel,
  usePanelContext,
  DagGraphExtension,
  FormItemWrapper,
  ContextMenuPanel,
  // NodeTreePanel,
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
import { setProps } from '../util';
// import { useGraph } from '../hooks/useGraph';

import AppContext from '../context';

import { FlowchartConfig } from '../interface';

import './index.less';

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  setProps(props);
  const { onReady, render, className, toolbarConfig, editorPanelConfig, data, mode } = props;
  const graphConfig = useGraphConfig(props);
  const menuConfig = useMenuConfig();
  const hookConfig = useGraphHook();

  // const cmdConfig = useCmdConfig();

  return (
    <AppContext.Provider value={{ theme: LightTheme }}>
      {/* <AppContext.Provider value={{ theme: LightTheme }}> */}
      <XFlow
        className={className}
        contextConfig={contextServiceConfig}
        // commandConfig={cmdConfig}
        hookConfig={hookConfig}
        onAppReadyCallback={async (app, registry) => {
          // onReady?.(useGraph(app, registry), registry);
          if (data) {
            const res = await app.executeCommand(XFlowGraphCommands.LOAD_DATA.id, {
              loadDataService: async (meta) => {
                return data;
              },
            } as NsGraphCmd.GraphLoadData.IArgs);
            const { graphData } = res?.contextProvider()?.getResult();
            /** 3. 画布内容渲染 */
            await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
              graphData,
            });
          }
        }}
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
