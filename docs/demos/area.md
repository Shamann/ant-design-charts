---
title: 面积图
order: 3
---

<!-- ### demo

```tsx
import React, { useState, useEffect } from 'react';
import { Demo } from '@ant-design/charts';

const DemoArea: React.FC = () => {
  return (
    <div style={{ height: 600 }}>
      <Demo />
    </div>
  );
};

export default DemoArea;
``` -->

### demo

```tsx
import React, { useState, useEffect } from 'react';
import {
  Flowchart,
  WorkspacePanel,
  XFlowNodeCommands,
  XFlowGraphCommands,
  usePanelContext,
} from '@ant-design/charts';

const NodeDetail: React.FC = (props) => {
  console.log(props);
  const { commands, contextService } = usePanelContext();
  console.log(usePanelContext());
  return (
    <div>
      <span> 重命名 </span>
      <input />
    </div>
  );
};

const DemoArea: React.FC = () => {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
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
            <WorkspacePanel
              className="xflow-workspace-right-panel"
              position={{ width: 290, top: 0, bottom: 0, right: 0 }}
            >
              <NodeDetail />
            </WorkspacePanel>
          );
        }}
      />
    </div>
  );
};

export default DemoArea;
```
