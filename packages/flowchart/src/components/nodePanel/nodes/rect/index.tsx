import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { createPath } from '../../util';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING } from '../../constants';
import './index.less';

export const RectNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;

  const { width, height } = size;

  const path = [
    ['M', NODE_PADDING, NODE_PADDING], // top-left
    ['L', width - 2 * NODE_PADDING, NODE_PADDING], // top-right
    ['L', width - 2 * NODE_PADDING, height - 2 * NODE_PADDING], // bottom-right
    ['L', NODE_PADDING, height - 2 * NODE_PADDING], // bottom-left
    ['Z'],
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      // viewBox={`0 0 40 30`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="cyan" />
        </filter>
      </defs>
      <path
        d={createPath(path)}
        fill="#fff"
        stroke="#eae8e8"
        style={{
          fill: '#fff',
          filter: 'url(#shadow)',
        }}
      />
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
