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
} from '@ant-design/charts';
import { data } from './data';
// import { EditorShape } from './rename';
import { formSchemaService, controlMapService } from './service';

const DemoArea: React.FC = () => {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
        // data={data}
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
              <FormPanel
                register={controlMapService}
                config={formSchemaService}
                position={{ width: 240, top: 0, bottom: 0, right: 0 }}
              />
              {/* <ConfigFormPanel
                controlMapService={controlMapService}
                formSchemaService={formSchemaService}
                formValueUpdateService={formValueUpdateService}
                position={{ width: 290, top: 0, bottom: 0, right: 0 }}
              /> */}
              <WorkspacePanel
                className="xflow-workspace-toolbar-bottom"
                position={{ bottom: 0, left: 240, right: 240, height: 40, lineHeight: 40 }}
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
