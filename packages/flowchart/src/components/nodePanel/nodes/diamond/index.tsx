import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { createPath } from '../../util';
import { NODE_HEIGHT, NODE_PADDING } from '../../constants';

export const DiamondNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_HEIGHT, height: NODE_HEIGHT }, data } = props;
  const { width, height } = size;

  const path = [
    ['M', width / 2, NODE_PADDING], // top
    ['L', width - 2 * NODE_PADDING, height / 2], // right
    ['L', width / 2, height - 2 * NODE_PADDING], // bottom
    ['L', NODE_PADDING, height / 2], // left
    ['Z'],
  ];

  return (
    <svg width={width} height={height}>
      <path d={createPath(path)} fill="#fff" stroke="#eae8e8" />
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
