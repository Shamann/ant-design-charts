import React from 'react';
// import { ConfigFormPanel as XFlowConfigFormPanel } from '@ali/xflow-extension';
import { ConfigFormPanel as XFlowConfigFormPanel } from '../canvas-config-form-panel';
import { IPosition } from '@ali/xflow-core';
import {
  IFormValueUpdateService,
  IFormSchamaService,
  IControlMapService,
} from '@ali/xflow-extension/es/canvas-config-form-panel/interface';
import { defaultUpdateService, defaultFormSchemaService } from './util';

export interface ConfigFormPanelProps {
  /** 节点|边内容更新 */
  readonly update?: IFormValueUpdateService;
  /** form 位置大小信息  */
  position?: IPosition;
  /** 注册自定义组件 */
  register?: IControlMapService;
  /** form 逻辑，多 tab 等 */
  config?: IFormSchamaService;
}

export const ConfigFormPanel: React.FC<ConfigFormPanelProps> = (props) => {
  const {
    register,
    config = defaultFormSchemaService,
    position = { width: 290, top: 0, bottom: 0, right: 0 },
  } = props;
  return (
    <XFlowConfigFormPanel
      controlMapService={register}
      formSchemaService={config}
      formValueUpdateService={defaultUpdateService}
      position={position}
    />
  );
};
