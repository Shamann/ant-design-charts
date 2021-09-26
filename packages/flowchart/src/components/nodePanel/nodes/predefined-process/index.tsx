import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow';
import { AppContext } from '../../index';
import { createPath } from '../../util';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING } from '../../constants';

export const PredefinedProcessNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;

  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;
  const struckOffset = width / 8;
  const struckWidth = 1;
  const path = [
    ['M', NODE_PADDING, NODE_PADDING], // top-left
    ['L', width - 2 * NODE_PADDING, NODE_PADDING], // top-right
    ['L', width - 2 * NODE_PADDING, height - 2 * NODE_PADDING], // bottom-right
    ['L', NODE_PADDING, height - 2 * NODE_PADDING], // bottom-left
    ['Z'],
  ];

  return (
    <svg width={width} height={height}>
      <path
        d={createPath(path)}
        fill={stateNodeConfig.fill}
        stroke={stateNodeConfig.stroke}
        style={{
          fill: '#fff',
          filter: 'url(#shadow)',
        }}
      />
      <rect
        x={struckOffset}
        y={NODE_PADDING}
        width={struckWidth}
        height={height - 2 * NODE_PADDING}
        fill={stateNodeConfig.stroke}
      />
      <rect
        x={width - struckOffset}
        y={NODE_PADDING}
        width={struckWidth}
        height={height - 2 * NODE_PADDING}
        fill={stateNodeConfig.stroke}
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
