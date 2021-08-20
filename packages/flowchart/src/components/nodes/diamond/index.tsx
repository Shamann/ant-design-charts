import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';

export const DiamondNode: NsGraphConfig.INodeRender = (props) => {
  return <div className="xflow-dnd-node"> diamond - {props.data.label}</div>;
};
