import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { NODE_HEIGHT } from '../../constants';

export const CircleNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_HEIGHT, height: NODE_HEIGHT }, data } = props;
  const { width, height } = size;
  return (
    <svg width={width} height={height}>
      <circle cx={width / 2} cy={height / 2} r={height / 2 - 1} fill="#fff" stroke="#eae8e8" />
      <text
        x={width / 2}
        y={height / 2}
        fill="#000"
        textAnchor="middle"
        alignment-baseline="middle"
      >
        {data?.label}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};
