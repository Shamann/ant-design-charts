import {
  NsAddNode,
  CommandConfig as XFlowCommandConfig,
  ContextConfig as XFlowContextConfig,
  IAppReadyCallback,
  GraphConfig,
  IConfigReadyCallback,
  ContextServiceConfig,
} from '@ali/xflow-core';

import { GraphPluginConfig } from '@ali/xflow-core/es/graph-plugin-module/config';

export interface FlowchartContainerConfig {
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  loadingTemplate?: React.ReactElement;
  errorTemplate?: (e: Error) => React.ReactNode;
}

export type Datum = {
  nodes?: unknown[];
  egdes?: unknown[];
};

export type Command = 'undo' | 'redo' | 'copy' | 'paste' | 'zoom';

export type CommandConfig = XFlowCommandConfig | Array<{ command: Command; text?: string }>;

export type ContextConfig = XFlowContextConfig;

// Flowchart 通用配置
export interface FlowchartConfig extends FlowchartContainerConfig {
  /** 是否缩放节点大小自适应容器 */
  autoFit?: boolean;
  width?: number;
  height?: number;

  data?: Datum;
  /** xflow config */
  xflowPrefixCls?: string;
  graphConfig?: GraphConfig;
  graphPluginConfig?: GraphPluginConfig;
  contextConfig?: ContextConfig;
  commandConfig?: CommandConfig;
  /** xflow初始化后的回调 */
  onAppReadyCallback?: IAppReadyCallback;
  onAppConfigReadyCallback?: IConfigReadyCallback;
  meta: {
    flowId?: string;
    [id: string]: any;
  };
  /** 是否开启动画 */
  animate?: boolean;
  /** 图表渲染完成回调 */
  onReady?: IAppReadyCallback;
  /** 图表渲染完成回调 */
  render?: () => React.ReactNode;
}

export { NsAddNode };
