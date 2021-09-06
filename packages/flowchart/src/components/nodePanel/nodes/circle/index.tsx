import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import './index.less';

export const CircleNode: NsGraphConfig.INodeRender = (props) => {
  return <div className="xflow-circle-node">{props.data.label}</div>;
};
