import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { NODE_WIDTH, NODE_HEIGHT } from '../../constants';

export const ParallelogramNode: NsGraphConfig.INodeRender = (props) => {
  return (
    <svg height={NODE_HEIGHT} width={NODE_WIDTH}>
      <path
        d={`M${NODE_HEIGHT} 1 L${NODE_WIDTH} 1 L${NODE_WIDTH - NODE_HEIGHT} ${NODE_HEIGHT - 1} L0 ${
          NODE_HEIGHT - 1
        } Z`}
        fill="#fff"
        stroke="#eae8e8"
      />
      <text
        x={NODE_WIDTH / 2}
        y={NODE_HEIGHT / 2}
        fill="#000"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        {props.data.label}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};
