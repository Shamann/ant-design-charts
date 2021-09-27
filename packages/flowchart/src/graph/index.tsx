import React from 'react';
import {
  XFlow,
  XFlowCanvas,
  XFlowGraphCommands,
  NsGraphCmd,
  FrontendApplication,
  CanvasScaleToolbar,
  ContextMenuPanel,
} from '@ali/xflow';
import { NodeTreePanel } from '../components/canvas-node-tree-panel';
import { treeDataService, searchService, onNodeDrop } from '../components/nodePanel';
import { FormPanel } from '../components/editorPanel';
import { ToolbarPanel } from '../components/toolbar';
import { useMenuConfig } from '../components/menu';
import Theme from '../theme';
import { setProps } from '../util';
import AppContext from '../context';
import { useGraphConfig, useGraphHook } from './service';

import { FlowchartConfig } from '../interface';

import './index.less';

const Flowchart: React.FC<FlowchartConfig> = (props) => {
  const { theme = 'light', detailPanelConfig, className, toolbarPanelConfig, data } = props;
  setProps(props);
  const graphConfig = useGraphConfig(props);
  const menuConfig = useMenuConfig();
  const hookConfig = useGraphHook();

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

  return (
    <AppContext.Provider value={{ theme: Theme[theme] }}>
      <XFlow
        className={className}
        hookConfig={hookConfig}
        onAppReadyCallback={async (app, registry) => {
          loadData(app);
        }}
      >
        <ToolbarPanel {...toolbarPanelConfig} />
        <NodeTreePanel
          searchService={searchService}
          treeDataService={treeDataService}
          onNodeDrop={onNodeDrop}
          position={{ width: 240, top: 0, bottom: 0, left: 0 }}
        />
        <XFlowCanvas config={graphConfig} position={{ top: 40, left: 240, right: 240, bottom: 0 }}>
          <CanvasScaleToolbar position={{ top: 12, left: 12 }} />
          <ContextMenuPanel config={menuConfig} />
        </XFlowCanvas>
        <FormPanel {...detailPanelConfig} />
      </XFlow>
    </AppContext.Provider>
  );
};

export default Flowchart;
