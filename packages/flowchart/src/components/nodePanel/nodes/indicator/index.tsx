import React, { useContext } from 'react';
import { NsGraphConfig } from '@ali/xflow-core';
import { AppContext } from '../../index';
import { CaretDownOutlined } from '@ant-design/icons';
import { NODE_HEIGHT, NODE_PADDING } from '../../constants';
import './index.less';

export { popover as IndicatorNodePopover } from './popover';
interface IndicatorItem {
  name: string;
  value: string | number;
}

export const IndicatorNode: NsGraphConfig.INodeRender = (props) => {
  const { size = { width: NODE_HEIGHT, height: NODE_HEIGHT }, data } = props;
  const {
    theme: { NodeConfig, LabelConfig },
  } = useContext(AppContext) as any;
  const stateNodeConfig = NodeConfig?.normal;
  const stateLabelConfig = LabelConfig?.normal;
  const { width, height } = size;
  const { init } = data;
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
};
