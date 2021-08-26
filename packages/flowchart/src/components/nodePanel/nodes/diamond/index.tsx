import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import './index.less';

export const DiamondNode: NsGraphConfig.INodeRender = (props) => {
  return <div className="xflow-diamond-node">{props.data.label}</div>;
};
