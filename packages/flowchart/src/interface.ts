import {
  GraphConfig,
  GraphCommandRegistry,
  ContextRegistry,
  NsGraph,
  IPosition,
  NsGraphConfig,
  NsConfigFormPanel,
  IToolbarLayout,
} from '@ali/xflow';
import { PopoverProps as AntDPopoverConfig } from 'antd/es/popover';

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

export interface CustomNode {
  name: string;
  component: NsGraphConfig.INodeRender<any>;
  popover?: React.Component<any>;
  label?: string;
  width?: number;
  height?: number;
  ports?: NsGraph.INodeConfig['ports'];
  [key: string]: unknown;
}

export interface RegisterNode {
  nodes: CustomNode[];
}

export interface NodePanelConfig {
  style?: React.CSSProperties;
  className?: string;
  /** 自定义节点 */
  registerNode?: RegisterNode;
  /** 节点位置 */
  position?: IPosition;
}

export type Command = 'undo-cmd' | 'redo-cmd' | 'front-node' | 'back-node' | 'save-graph-data';
export type CommandItem = {
  /** 命令 */
  command: Command;
  /** 名称 */
  text?: string;
  /** icon */
  iconName?: string;
};
export interface ToolbarPanelConfig {
  commands?: CommandItem[];
  position?: IPosition;
  layout?: IToolbarLayout;
  style?: React.CSSProperties;
  className?: string;
}

export interface ScaleToolbarPanelConfig {
  position?: IPosition;
  style?: React.CSSProperties;
  className?: string;
}

export interface DetailPanelConfig {
  controlMapService: (editorMap: NsConfigFormPanel.IControlMap) => NsConfigFormPanel.IControlMap;
  formSchemaService: Promise<
    (args: {
      values: Record<string, any>;
      currentNode: NsGraph.INodeConfig | null;
      contextService: ContextRegistry;
      commands: GraphCommandRegistry;
    }) => NsConfigFormPanel.ISchema
  >;
  position?: IPosition;
  style?: React.CSSProperties;
  prefixClz?: string;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  footerText?: string;
  headerText?: string;
}

export interface GraphEvents {
  /** 节点点击事件 */
  handleNodeClick?: (node: NsGraph.INodeConfig) => void;
  /** 边点击事件 */
  handleEdgeClick?: (edge: NsGraph.IEdgeConfig) => void;
}

export interface PopoverConfig extends Omit<AntDPopoverConfig, 'title' | 'content'> {
  title?: (data: NsGraph.INodeConfig) => React.ReactNode;
  content?: (data: NsGraph.INodeConfig) => React.ReactNode;
}

// Flowchart 通用配置
export interface FlowchartConfig extends FlowchartContainerConfig {
  /** 默认数据 */
  data?: Datum;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 模式 */
  mode: 'edit' | 'scan';
  /** 点击回调，仅支持 save-graph-data */
  onSaveData?: (data: Datum) => void;
  /** 节点面板配置 */
  nodePanelConfig?: NodePanelConfig;
  /** toolbar */
  toolbarPanelConfig?: ToolbarPanelConfig;
  /** scale toolbar */
  scaleToolbarPanelConfig?: ScaleToolbarPanelConfig;
  /** form editor */
  detailPanelConfig?: DetailPanelConfig;
  /** 主画布配置 */
  graphConfig?: GraphConfig;
  /** events */
  events?: GraphEvents;
  /** popover */
  popoverConfig?: PopoverConfig;
}
