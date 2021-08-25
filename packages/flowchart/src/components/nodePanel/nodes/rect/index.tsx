import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import './index.less';

export const RectNode: NsGraphConfig.INodeRender = (props) => {
  return (
    <div className="xflow-rect-node">
      <p>rect</p>
      {props.data.label}
    </div>
  );
};
