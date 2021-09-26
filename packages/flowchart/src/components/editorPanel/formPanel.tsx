import React from 'react';
import {
  ConfigFormPanel as XFlowConfigFormPanel,
  IPosition,
  IFormSchamaService,
  IControlMapService,
} from '@ali/xflow';

import { defaultFormSchemaService } from './formSchemaService';
import { defaultControlMapService } from './controlMapService';

export interface ConfigFormPanelProps {
  /** form 位置大小信息  */
  position?: IPosition;
  /** 注册自定义组件 */
  controlMapService?: IControlMapService;
  /** form 逻辑，多 tab 等 */
  formSchemaService?: IFormSchamaService;
}

export const FormPanel: React.FC<ConfigFormPanelProps> = (props) => {
  const {
    controlMapService = defaultControlMapService,
    formSchemaService = defaultFormSchemaService,
    position = { width: 240, top: 0, bottom: 0, right: 0 },
    ...rest
  } = props;

  return (
    <XFlowConfigFormPanel
      targetType={['node', 'edge', 'canvas', 'group']}
      controlMapService={controlMapService}
      formSchemaService={formSchemaService}
      position={position}
      {...rest}
    />
  );
};
