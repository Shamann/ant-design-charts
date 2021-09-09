import React from 'react';
import classNames from 'classnames';
import { ToolbarConfig, createModule } from '../module';
import { IPosition, usePositionStyle, useExtensionConfigContext } from '@ali/xflow-core';
import { IToolbarLayout } from '@ali/xflow-core/es/toolbar/interface';

export interface IProps {
  position: IPosition;
  config?: ToolbarConfig;
  layout: IToolbarLayout;
  style?: React.CSSProperties;
  className?: string;
}

export const ToolbarPanel: React.FC<IProps> = (props) => {
  const { className, layout, position, children, style, ...rest } = props;
  /** 获取配置中心 */
  const extensionRegistry = useExtensionConfigContext();
  const containerRef = React.useRef<HTMLDivElement>(null);
  /** 获取ContextService的配置 */
  const toolbarConfig = React.useMemo<ToolbarConfig>(
    () => (props.config ? props.config : new ToolbarConfig()),
    [],
  );

  React.useEffect(() => {
    const disposable = extensionRegistry.addExtension({
      config: toolbarConfig,
      createModule,
    });
    /** resolve */
    if (containerRef.current) {
      /** 设置 container */
      toolbarConfig.setDomContainer(containerRef.current);
      /** 设置 toolbar 属性 */
      toolbarConfig.setOptions({ layout });
    }
    return () => {
      disposable.dispose();
      toolbarConfig.dispose();
    };
  }, [containerRef.current]);

  const clz = classNames(className, layout, 'xflow-toolbar');

  const positionStyle = usePositionStyle(position);

  return (
    <div
      className={clz}
      ref={containerRef}
      style={{
        ...positionStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const createToolbarConfig = (addOptions: (config: ToolbarConfig) => void) => () => {
  return React.useMemo(() => {
    const toolbarConfig = new ToolbarConfig();
    addOptions(toolbarConfig);
    return toolbarConfig;
  }, []);
};
