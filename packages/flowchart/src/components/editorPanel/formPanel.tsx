import React from 'react';
import { ConfigFormPanel as XFlowConfigFormPanel } from '@ali/xflow-extension';
import { IPosition } from '@ali/xflow-core';
import {
  IFormSchamaService,
  IControlMapService,
} from '@ali/xflow-extension/es/canvas-config-form-panel/interface';
import { defaultUpdateService, defaultFormSchemaService } from './util';

export interface ConfigFormPanelProps {
  /** form 位置大小信息  */
  position?: IPosition;
  /** 注册自定义组件 */
  register?: IControlMapService;
  /** form 逻辑，多 tab 等 */
  formSchemaService?: IFormSchamaService;
}

export const FormPanel: React.FC<ConfigFormPanelProps> = (props) => {
  const {
    register,
    formSchemaService = defaultFormSchemaService,
    position = { width: 240, top: 0, bottom: 0, right: 0 },
  } = props;
  return (
    <XFlowConfigFormPanel
      targetType={['node', 'edge', 'canvas']}
      controlMapService={register}
      formSchemaService={formSchemaService}
      formValueUpdateService={defaultUpdateService}
      position={position}
    />
  );
};
