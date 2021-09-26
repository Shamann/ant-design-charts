import React, { useState, useEffect, Fragment } from 'react';
import {
  Flowchart,
  WorkspacePanel,
  XFlowNodeCommands,
  XFlowGraphCommands,
  usePanelContext,
  ToolbarPanel,
  FormItemWrapper,
  FormPanel,
  IconStore,
} from '@ant-design/charts';

import {
  SaveOutlined,
  RedoOutlined,
  RollbackOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
import { data } from './data';
import { formSchemaService, controlMapService } from './service';
import { CustomNode } from './node';

/** 注册icon 类型 */
const registerIcon = () => {
  IconStore.set('SaveOutlined', SaveOutlined);
  IconStore.set('RollbackOutlined', RollbackOutlined);
  IconStore.set('RedoOutlined', RedoOutlined);
  IconStore.set('BackwardOutlined', BackwardOutlined);
  IconStore.set('ForwardOutlined', ForwardOutlined);
};

registerIcon();

const DemoArea: React.FC = () => {
  const [mode, setMode] = useState('edit');

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMode('scan');
  //   }, 1000);
  // }, []);

  return (
    <div style={{ height: 600 }}>
      <Flowchart
        data={data}
        mode={mode}
        onSaveData={(d) => {
          console.log(d);
        }}
        // popoverConfig={{
        //   title: () => {
        //     return <div>title</div>;
        //   },
        //   content: () => {
        //     return <div>123</div>;
        //   },
        //   // antd/popover 额外配置
        //   extra: {},
        // }}
        // registerNode={{
        //   nodes: [
        //     {
        //       component: CustomNode,
        //       popover: () => <div>节点1</div>,
        //       name: 'custom-node',
        //       width: 60,
        //       height: 40,
        //       label: '节点1',
        //     },
        //   ],
        // }}
        // toolbarConfig={{
        //   config: [
        //     {
        //       command: 'redo-cmd',
        //       text: '重做',
        //       iconName: 'RedoOutlined',
        //     },
        //     {
        //       command: 'undo-cmd',
        //       text: '撤销',
        //     },
        //     {
        //       command: 'save-graph-data',
        //       text: '保存',
        //       callback: (graphData) => {
        //         console.log(graphData);
        //       },
        //     },
        //   ],
        // }}
        editorPanelConfig={
          {
            // controlMapService,
            // formSchemaService,
            // position: { width: 240, top: 0, bottom: 0, right: 0 },
          }
        }
        render={() => {
          return (
            <Fragment>
              {/* <FormPanel
                controlMapService={controlMapService}
                formSchemaService={formSchemaService}
                position={{ width: 240, top: 0, bottom: 0, right: 0 }}
              /> */}
              {/* <WorkspacePanel
                className="xflow-workspace-toolbar-bottom"
                position={{ bottom: 0, left: 240, right: 240, height: 40, lineHeight: 40 }}
                style={{ borderTop: '1px solid #ccc' }}
              >
                <div> Bottom Toolbar </div>
              </WorkspacePanel> */}
            </Fragment>
          );
        }}
      />
    </div>
  );
};

export default DemoArea;
