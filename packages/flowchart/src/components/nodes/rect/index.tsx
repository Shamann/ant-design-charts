import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import './index.less';

export const DndNode: NsGraphConfig.INodeRender = (props) => {
  return <div className="xflow-dnd-node">{props.data.label}</div>;
};
