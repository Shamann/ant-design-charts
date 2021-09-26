import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { AppContext } from '../../index';
import { createPath } from '../../util';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING } from '../../constants';

export const HardDiskNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;
  const bezierX = width / 10;
  const bezierY = height / 4;

  const path = [
    ['M', NODE_PADDING + bezierX, NODE_PADDING], // top-left
    ['L', width - 2 * NODE_PADDING - bezierX, NODE_PADDING], // top-right
    [
      'C',
      width - 2 * NODE_PADDING,
      NODE_PADDING + bezierY,
      width - 2 * NODE_PADDING,
      NODE_HEIGHT - 2 * NODE_PADDING - bezierY,
    ], // 控制点，开口左
    ['', width - 2 * NODE_PADDING - bezierX, NODE_HEIGHT - 2 * NODE_PADDING], // bottom-right
    ['L', NODE_PADDING + bezierX, height - 2 * NODE_PADDING], // bottom-left
    ['C', NODE_PADDING, height - 2 * NODE_PADDING - bezierY, NODE_PADDING, NODE_PADDING + bezierY], // 控制点，开口左
    ['', NODE_PADDING + bezierX, NODE_PADDING], // top-left
  ];
  // 遵循绘制顺序，多个 path 绘制弧
  const pathBezierRight = [
    ['M', width - 2 * NODE_PADDING - bezierX, NODE_PADDING], // top-right
    [
      'C',
      width - 2 * NODE_PADDING - 2 * bezierX,
      NODE_PADDING + bezierY,
      width - 2 * NODE_PADDING - 2 * bezierX,
      NODE_HEIGHT - 2 * NODE_PADDING - bezierY,
    ], // 控制点，开口向右
    ['', width - 2 * NODE_PADDING - bezierX, NODE_HEIGHT - 2 * NODE_PADDING], // bottom-right
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
      <path
        d={createPath(pathBezierRight)}
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
