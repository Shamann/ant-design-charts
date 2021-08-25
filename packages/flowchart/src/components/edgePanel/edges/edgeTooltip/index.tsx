import React from 'react';
import type { NsGraphConfig } from '@ali/xflow-core';
import { useAppContext } from '@ali/xflow-core';
import { Tooltip } from 'antd';
import './index.less';

export const Edge1: NsGraphConfig.IEdgeRender = (props) => {
  const ctx = useAppContext();
  return (
    <div className="edge1-container">
      <Tooltip
        title="这是连线上渲染的React内容"
        // defaultVisible={true}
      >
        <div>hover我</div>
      </Tooltip>
    </div>
  );
};
