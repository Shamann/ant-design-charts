import React from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { CaretDownOutlined } from '@ant-design/icons';
import { createPath } from '../../util';
import { NODE_HEIGHT, NODE_PADDING } from '../../constants';
import './index.less';

interface IndicatorItem {
  name: string;
  value: string | number;
}

export const IndicatorNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_HEIGHT, height: NODE_HEIGHT }, data } = props;
  const { width, height } = size;
  const { init } = data;
  const path = [
    ['M', width / 2, NODE_PADDING], // top
    ['L', width - 2 * NODE_PADDING, height / 2], // right
    ['L', width / 2, height - 2 * NODE_PADDING], // bottom
    ['L', NODE_PADDING, height / 2], // left
    ['Z'],
  ];
  return (
    <div className="indicator-container" style={{ width, height }}>
      <span className="title">{init.title}</span>
      <div className="main">
        <b>-</b>
        <CaretDownOutlined style={{ color: 'red' }} />
      </div>
      {(init?.baseRelative || []).map((item: IndicatorItem) => {
        return (
          <div className="relative" key={item.name}>
            <span>{item.name}</span>
            <b>{item.value || '-'}</b>
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <svg width={width} height={height}>
  //     <path d={createPath(path)} fill="#fff" stroke="#eae8e8" />
  //     <text
  //       x={width / 2}
  //       y={height / 2}
  //       fill="#000"
  //       text-anchor="middle"
  //       alignment-baseline="middle"
  //     >
  //       {data?.label}
  //     </text>
  //     Sorry, your browser does not support inline SVG.
  //   </svg>
  // );
};
