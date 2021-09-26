import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { AppContext } from '../../index';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING } from '../../constants';

export const TerminalNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      // viewBox={`0 0 40 30`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      {/* 一次注册，多次调用 */}
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="#fff" />
        </filter>
      </defs>
      <rect
        x={NODE_PADDING}
        y={NODE_PADDING}
        rx={height / 2}
        ry={height / 2}
        width={width - 2 * NODE_PADDING}
        height={height - 2 * NODE_PADDING}
        fill={stateNodeConfig.fill}
        stroke={stateNodeConfig.stroke}
        style={{
          fill: '#fff',
          filter: 'url(#shadow)',
        }}
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
