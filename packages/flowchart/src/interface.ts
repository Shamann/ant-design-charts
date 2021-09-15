import {
  CommandConfig as XFlowCommandConfig,
  ContextConfig as XFlowContextConfig,
  IAppReadyCallback,
  GraphConfig,
  IConfigReadyCallback,
  GraphCommandRegistry,
  ContextRegistry,
  NsGraph,
  GraphPluginConfig,
} from '@ali/xflow-core';
import { NsConfigFormPanel } from '@ali/xflow-extension';
import { IProps as ToolbarConfig } from '@ali/xflow-extension/es/toolbar-panel/components';
// import { GraphPluginConfig } from '@ali/xflow-core/es/graph-plugin-module/config';
import { FrontendApplication } from '@ali/xflow-core/es/xflow-main/application';
import { ExtensionRegistry } from '@ali/xflow-core/es/xflow-main/components/extension-registry';

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

export type CommandItem = { command: Command; text?: string };

export interface ToolbarPanelConfig extends Omit<ToolbarConfig, 'config'> {
  config?: ToolbarConfig['config'] | Array<CommandItem>;
}

export interface EditorPanelConfig {
  register: (editorMap: NsConfigFormPanel.IControlMap) => NsConfigFormPanel.IControlMap;
  panelService: Promise<
    (args: {
      values: Record<string, any>;
      currentNode: NsGraph.INodeConfig | null;
      contextService: ContextRegistry;
      commands: GraphCommandRegistry;
    }) => NsConfigFormPanel.ISchema
  >;
  onUpdated?: Promise<
    (args: {
      values: Record<string, any>;
      currentNode: NsGraph.INodeConfig | null;
      contextService: ContextRegistry;
      commands: GraphCommandRegistry;
    }) => void
  >;
}

export interface IGraph {
  __proto__: {
    [key: string]: (params: any) => unknown;
  };
  app: FrontendApplication;
  registry: ExtensionRegistry;
}

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
  toolbarConfig: ToolbarPanelConfig;
  /** editor */
  editorPanelConfig?: EditorPanelConfig;
  onAppConfigReadyCallback?: IConfigReadyCallback;
  meta: {
    flowId?: string;
    [id: string]: any;
  };
  /** 模式 */
  mode: 'edit' | 'scan';
  /** 是否开启动画 */
  animate?: boolean;
  /** 图表渲染完成回调 */
  // onReady?: (graph: IGraph, registry?: ExtensionRegistry) => void;
  onReady?: IAppReadyCallback;
  /** 图表渲染完成回调 */
  render?: () => React.ReactNode;
}
