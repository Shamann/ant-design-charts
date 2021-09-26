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
  FrontendApplication,
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
import { contextServiceConfig } from '../service';
import { useGraphConfig, keybindingConfig, useGraphHook } from './config';
import { onNodeDrop } from '../command';
import { treeDataService, searchService } from '../components/nodePanel';
import { ToolbarPanel } from '../components/toolbar';
// import { CanvasScaleToolbar } from '../components/canvas-scale-toolbar/components';
import { useMenuConfig } from '../components/menu';
import Theme from '../theme';
import { setProps } from '../util';
// import { useGraph } from '../hooks/useGraph';

import AppContext from '../context';

import { FlowchartConfig } from '../interface';

import './index.less';

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  setProps(props);
  const { theme = 'light', render, className, toolbarConfig, data, mode } = props;
  const graphConfig = useGraphConfig(props);
  const menuConfig = useMenuConfig();
  const hookConfig = useGraphHook();

  // const cmdConfig = useCmdConfig();

  const loadData = async (app: FrontendApplication) => {
    if (data) {
      const res = await app.executeCommand(XFlowGraphCommands.LOAD_DATA.id, {
        loadDataService: async () => {
          return data;
        },
      } as NsGraphCmd.GraphLoadData.IArgs);
      const { graphData } = res?.contextProvider()?.getResult();
      /** 3. 画布内容渲染 */
      await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
        graphData,
      });
    }
  };

  if (mode === 'scan') {
    return (
      <AppContext.Provider value={{ theme: Theme[theme] }}>
        <XFlow
          className={className}
          contextConfig={contextServiceConfig}
          // commandConfig={cmdConfig}
          hookConfig={hookConfig}
          onAppReadyCallback={async (app, registry) => {
            loadData(app);
          }}
        >
          <XFlowCanvas config={graphConfig} position={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <CanvasScaleToolbar position={{ top: 12, right: 12 }} />
          </XFlowCanvas>
        </XFlow>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ theme: Theme[theme] }}>
      <XFlow
        className={className}
        contextConfig={contextServiceConfig}
        // commandConfig={cmdConfig}
        hookConfig={hookConfig}
        onAppReadyCallback={async (app, registry) => {
          loadData(app);
        }}
      >
        <ToolbarPanel {...toolbarConfig} />
        <NodeTreePanel
          searchService={searchService}
          treeDataService={treeDataService}
          onNodeDrop={onNodeDrop}
          position={{ width: 240, top: 0, bottom: 0, left: 0 }}
        />
        <XFlowCanvas config={graphConfig} position={{ top: 40, left: 240, right: 240, bottom: 0 }}>
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
