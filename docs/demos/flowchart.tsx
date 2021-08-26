import React, { useState, useEffect, Fragment } from 'react';
import {
  Flowchart,
  WorkspacePanel,
  XFlowNodeCommands,
  XFlowGraphCommands,
  usePanelContext,
  ToolbarPanel,
  FormItemWrapper,
  ConfigFormPanel,
} from '@ant-design/charts';
import { Form, Input } from 'antd';
// import { EditorShape } from './rename';
import { formSchemaService, formValueUpdateService, controlMapService } from './index';

const DemoArea: React.FC = () => {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
        toolbarConfig={{
          config: [
            {
              command: 'redo',
              text: '重做',
            },
            {
              command: 'undo',
              text: '撤销',
            },
          ],
        }}
        editorPanelConfig={
          {
            // register: async (editorMap) => {
            //   console.log('999', EditorShape);
            //   editorMap.set('rename', EditorShape);
            //   return editorMap;
            // },
            // panelService: async (args) => {
            //   const { currentNode, contextService } = args;
            //   const nodeSchema = {
            //     tabs: [
            //       {
            //         name: '属性',
            //         groups: [
            //           {
            //             name: 'groupName',
            //             controls: [
            //               {
            //                 label: '重命名',
            //                 name: 'Tab1-0',
            //                 shape: 'rename',
            //               },
            //             ],
            //           },
            //         ],
            //       },
            //       {
            //         name: '位置',
            //         groups: [
            //           {
            //             name: 'groupName',
            //             controls: [{ label: '图表宽度', name: 'Tab1-1', shape: 'Input' }],
            //           },
            //         ],
            //       },
            //     ],
            //   };
            //   if (currentNode) {
            //     return nodeSchema;
            //   }
            //   return {
            //     tabs: [],
            //   };
            // },
            // onUpdated: async (arg) => {
            //   console.log('updated', arg);
            // },
          }
        }
        onReady={(app) => {
          // setTimeout(() => {
          //   app.executeCommand(XFlowNodeCommands.ADD_NODE.id, {
          //     beforeExec: async () => {
          //       const execArgs: NsAddNode.IExecArgs = {
          //         nodeConfig: {
          //           id: 'root1',
          //           x: 80,
          //           y: 180,
          //           width: 200,
          //           height: 50,
          //           label: 'customNode',
          //         },
          //       };
          //       return [null, execArgs];
          //     },
          //   } as NsAddNode.IConfig);
          // }, 2000);
        }}
        render={() => {
          return (
            <Fragment>
              <ConfigFormPanel
                controlMapService={controlMapService}
                formSchemaService={formSchemaService}
                formValueUpdateService={formValueUpdateService}
                position={{ width: 290, top: 0, bottom: 0, right: 0 }}
              />
              <WorkspacePanel
                className="xflow-workspace-toolbar-bottom"
                position={{ bottom: 0, left: 290, right: 290, height: 40, lineHeight: 40 }}
                style={{ borderTop: '1px solid #ccc' }}
              >
                <div> Bottom Toolbar </div>
              </WorkspacePanel>
            </Fragment>
          );
        }}
      />
    </div>
  );
};

export default DemoArea;
