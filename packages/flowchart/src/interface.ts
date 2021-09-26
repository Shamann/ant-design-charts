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
  NsGraphConfig,
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

export type CommandConfig = XFlowCommandConfig | Array<{ command: Command; text?: string }>;

export type ContextConfig = XFlowContextConfig;

export type Command = 'undo-cmd' | 'redo-cmd' | 'front-node' | 'back-node' | 'save-graph-data';

export type CommandItem = {
  /** 命令 */
  command: Command;
  /** 名称 */
  text?: string;
  /** icon */
  iconName?: string;
};

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

export interface RegisrerNode {
  name: string;
  component: NsGraphConfig.INodeRender<any>;
  popover?: React.Component<any>;
  label?: string;
  width?: number;
  height?: number;
  ports?: any;
}

export interface RegisrerNodes {
  nodes: RegisrerNode[];
  config: unknown;
}

// Flowchart 通用配置
export interface FlowchartConfig extends FlowchartContainerConfig {
  /** 默认数据 */
  data?: Datum;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 模式 */
  mode: 'edit' | 'scan';

  /** 图表渲染完成回调 */
  render?: () => React.ReactNode;
  /** 点击回调，仅支持 save-graph-data */
  onSaveData?: (data: Datum) => void;
  /** xflow config */
  xflowPrefixCls?: string;
  graphConfig?: GraphConfig;
  graphPluginConfig?: GraphPluginConfig;
  contextConfig?: ContextConfig;
  commandConfig?: CommandConfig;
  toolbarConfig: ToolbarPanelConfig;
  registerNode: RegisrerNodes;
  /** editor */
  editorPanelConfig?: EditorPanelConfig;
}
