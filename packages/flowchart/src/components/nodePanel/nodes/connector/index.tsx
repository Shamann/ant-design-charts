import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { AppContext } from '../../index';
import { NODE_HEIGHT } from '../../constants';
export { popover as ConnectorNodePopover } from './popover';

export const ConnectorNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_HEIGHT, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;
  return (
    <svg width={width} height={height}>
      <circle
        cx={width / 2}
        cy={height / 2}
        r={height / 2 - 1}
        fill={stateNodeConfig.fill}
        stroke={stateNodeConfig.stroke}
      />
      <text
        x={width / 2}
        y={height / 2}
        fill={stateLabelConfig.fill}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {data?.label}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};
