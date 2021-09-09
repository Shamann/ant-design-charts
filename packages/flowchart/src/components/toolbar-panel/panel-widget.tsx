import ReactDom from 'react-dom';
import React from 'react';
import { injectable, inject, postConstruct } from '@alipay/mana-syringe';
import { IGraphOptionProvider, RxModel, PortalProvider } from '@ali/xflow-core';
import {
  ContextRegistry,
  IContextService,
  IWidget,
  DisposableCollection,
  ToolbarRegistry,
  GraphCommandRegistry,
} from '@ali/xflow-core';

import { IModel } from './interface';
import { XFlowToolbar } from './render-components';
import { PanelContext } from './render-components/context';
import { ToolbarConfig } from './config';

/** widget：负责render react 组件 */
@injectable()
export class PanelWidget implements IWidget {
  /** 生成model的initalState */
  private static getInitialState = () => {
    return {} as IModel;
  };
  /** widget：负责render */
  private toDispose = new DisposableCollection();
  /** portal render 的 销毁逻辑  */
  private toDisposePortals = new DisposableCollection();
  /** ContextService */
  @inject(IContextService)
  protected readonly contextService: ContextRegistry;
  /** commands */
  @inject(GraphCommandRegistry)
  private commands: GraphCommandRegistry;
  /** ToolbarRegistry */
  @inject(ToolbarRegistry)
  protected readonly toolbarRegistry: ToolbarRegistry;
  /** 可订阅的IOnDidChange */
  @inject(PortalProvider)
  protected readonly portalProvider: PortalProvider;
  /** config */
  @inject(ToolbarConfig)
  protected readonly toolbarConfig: ToolbarConfig;
  /** 可订阅的IOnDidChange */
  @inject(IGraphOptionProvider)
  protected readonly graphOptionProvider: IGraphOptionProvider;
  /** 用于渲染的model */
  protected model = new RxModel<IModel>(PanelWidget.getInitialState());
  /** 订阅model/注册toolbar/注册cmds/注册context */
  @postConstruct()
  protected async init() {
    /**connect model 和 React 渲染 */
    const disposable = this.model.onDidChange(async () => this.render());
    this.toDispose.push(disposable);
    this.registerToolbarItems();
    this.registerCmds();
    this.registerContext();
  }
  /** 注册toolbarItems */
  protected registerToolbarItems() {
    const { registerToolbarItems } = this.toolbarConfig.getRegisterFunctions();
    const disposable = this.toolbarRegistry.registerDisposableToolbar(registerToolbarItems);
    this.toDispose.push(disposable);
  }
  /** 注册组件的commands */
  protected registerCmds() {
    const { registerCommand } = this.toolbarConfig.getRegisterFunctions();
    const disposable = this.commands.registerDisposableCommand(registerCommand);
    this.toDispose.push(disposable);
  }
  /** 注册组件的context */
  protected registerContext<T = any, M = any>() {
    const { registerContext } = this.toolbarConfig.getRegisterFunctions();
    const disposable = this.contextService.registerDisposableContext(registerContext);
    this.toDispose.push(disposable);
  }
  /** public的启动方法, 渲染contextMenu */
  onStart = async () => {
    /** 获取graph container 的dom节点 */
    const { toolbarOptions } = await this.toolbarConfig.getConfig();
    /** 获取 toolbar model */
    const toolbarModel = this.toolbarRegistry.getToolbarModel(toolbarOptions);
    /** 更新 toolbar model 自动触发render */
    this.model.fireChange(toolbarModel);
  };
  /** public的销毁方法  */
  onStop = async () => {
    this.dispose();
  };
  /** react render */
  protected render = async () => {
    const domContainer = await this.toolbarConfig.getDomContainer();
    /** unmount portals */
    this.toDisposePortals.dispose();
    this.toDisposePortals = new DisposableCollection();
    /** mount portals */
    const RenderComponent = this.getRenderComponent();
    RenderComponent.displayName = 'XFlowPanelPortal';
    const disposable = this.portalProvider.addPortals([
      ReactDom.createPortal(<RenderComponent />, domContainer),
    ]);
    this.toDisposePortals.push(disposable);
  };

  /** create react function component */
  protected getRenderComponent(): React.FunctionComponent {
    const self: PanelWidget = this;
    return function PanelWrap() {
      return (
        <PanelContext.Provider
          value={{
            model: self.model,
            commands: self.commands,
            config: self.toolbarConfig,
            contextService: self.contextService,
          }}
        >
          <XFlowToolbar />
        </PanelContext.Provider>
      );
    };
  }

  /** 销毁portal和event */
  protected dispose() {
    this.toDispose.dispose();
    this.toDisposePortals.dispose();
  }
}
