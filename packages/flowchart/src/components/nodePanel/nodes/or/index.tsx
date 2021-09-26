import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow';
import { AppContext } from '../../index';
import { createPath } from '../../util';
import { NODE_WIDTH, NODE_HEIGHT, NODE_PADDING } from '../../constants';

export const OrNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;
  const path1 = [
    ['M', height / 2, NODE_PADDING], // top-center
    ['L', height / 2, height - 2 * NODE_PADDING], // bottom-center
  ];
  const path2 = [
    ['M', NODE_PADDING, height / 2], // left-center
    ['L', height - 2 * NODE_PADDING, height / 2], // right-center
  ];

  return (
    <div style={{ width, height, textAlign: 'center' }}>
      <svg width={height} height={height}>
        <circle
          cx={height / 2}
          cy={height / 2}
          r={height / 2 - NODE_PADDING}
          style={{
            fill: '#fff',
            filter: 'url(#shadow)',
          }}
          stroke={stateNodeConfig.stroke}
        />
        <path d={createPath(path1)} stroke={stateNodeConfig.stroke} />
        <path d={createPath(path2)} stroke={stateNodeConfig.stroke} />
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
    </div>
  );
};
