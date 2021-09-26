import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow';
import { AppContext } from '../../index';
import { NODE_HEIGHT, NODE_WIDTH, NODE_PADDING } from '../../constants';

export const ConnectorNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;

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
        <text
          x={height / 2}
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
