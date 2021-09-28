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
  const availableR = height - 2 * NODE_PADDING;

  return (
    <div style={{ width, height, textAlign: 'center' }}>
      <svg width={height} height={height}>
        <path
          d={`M ${NODE_PADDING},${height / 2} a ${availableR / 2} ${availableR / 2} 0 1 1 0 1 z`}
          fill={stateNodeConfig.fill}
          stroke={stateNodeConfig.stroke}
          style={{
            fill: '#fff',
          }}
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
