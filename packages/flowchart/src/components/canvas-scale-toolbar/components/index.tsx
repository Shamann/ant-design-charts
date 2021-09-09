import React from 'react';
import { ToolbarPanel } from '../../toolbar-panel/components';
import { useExtensionConfigContext, IPosition } from '@ali/xflow-core';
import classNames from 'classnames';
import { createModule } from '../module';
import { useConfig } from './config';

export namespace NsCanvasScalePanel {
  export const CONFIG_TYPE = 'CanvasScaleToolbar';
}
interface IProps {
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  position?: IPosition;
}

export const CanvasScaleToolbar: React.FC<IProps> = (props) => {
  const { className, name = NsCanvasScalePanel.CONFIG_TYPE } = props;
  const extensionRegistry = useExtensionConfigContext();
  const config = useConfig();

  React.useEffect(() => {
    extensionRegistry.addExtension({
      config: config,
      createModule,
    });
  });

  const clz = classNames(className, 'xflow-canvas-vertical-toolbar');
  return (
    <ToolbarPanel
      config={config}
      className={clz}
      layout="horizontal"
      position={props.position || { top: 12, right: 12 }}
    />
  );
};
