---
title: 面积图
order: 3
---

### 带中位线标注的基础面积图

```tsx
import React, { useState, useEffect } from 'react';
import { Flowchart, WorkspacePanel } from '@ant-design/charts';

const DemoArea: React.FC = () => {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
        render={() => {
          return (
            <WorkspacePanel
              className="xflow-workspace-left-panel"
              position={{ width: 290, top: 0, bottom: 0, left: 0 }}
            >
              <span>123</span>
            </WorkspacePanel>
          );
        }}
      />
    </div>
  );
};

export default DemoArea;
```
