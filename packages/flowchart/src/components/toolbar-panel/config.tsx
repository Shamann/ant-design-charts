import { Deferred, Disposable } from '@ali/xflow-core';
import {
  IRenderConfig,
  IRegisterToolbarItemFunction,
  IToolbarOptions,
} from '@ali/xflow-core/es/toolbar/interface';
import { ICommandRegisterFunction } from '@ali/xflow-core/es/command/interface';
import { IContextRegisterFunction } from '@ali/xflow-core/es/context-service/interface';

export namespace NsToolbarConfig {
  export const CONFIG_TYPE = 'TOOLBAR_CONFIG';
}

export class ToolbarConfig {
  /** CONFIG_TYPE */
  readonly CONFIG_TYPE = NsToolbarConfig.CONFIG_TYPE;

  /** toolbar的属性 */
  private toolbarOption?: IToolbarOptions;

  /** dom container */
  private container?: Deferred<HTMLElement> = new Deferred();

  /** 注册items */
  private registerToolbarItemsFn?: IRegisterToolbarItemFunction = () =>
    Disposable.create(() => null);

  /** 注册组件的commands */
  private registerCommandFn?: ICommandRegisterFunction = () => Disposable.create(() => null);

  /** 注册组件的Context */
  private registerContextFn?: IContextRegisterFunction = () => Disposable.create(() => null);

  /** container */
  setDomContainer = (ele: HTMLElement) => {
    this.container.resolve(ele);
  };

  /** 获取toolbar的dom element */
  getDomContainer = async (): Promise<HTMLElement> => {
    return (await this.container?.promise) as HTMLElement;
  };

  /** IOptions */
  setOptions = (options: Partial<IToolbarOptions>) => {
    this.toolbarOption = { ...this.toolbarOption, ...options };
  };

  /** 注册ToolbarItems */
  setToolbarItemRegisterFn = (fn: IRegisterToolbarItemFunction) => {
    this.registerToolbarItemsFn = fn;
  };

  /** 注册Commands */
  setCommandRegisterFn = (fn: ICommandRegisterFunction) => {
    this.registerCommandFn = fn;
  };

  /** 注册Context */
  setContextRegisterFn = (fn: IContextRegisterFunction) => {
    this.registerContextFn = fn;
  };

  /** 所有扩展注册项的函数 */
  getRegisterFunctions = () => {
    return {
      registerToolbarItems: this.registerToolbarItemsFn,
      registerCommand: this.registerCommandFn,
      registerContext: this.registerContextFn,
    };
  };

  /** 获取用于渲染的配置 */
  getConfig = async (): Promise<IRenderConfig> => {
    const container = await this.getDomContainer();

    return {
      container: container,
      toolbarOptions: this.toolbarOption,
    };
  };

  dispose = () => {
    this.container = new Deferred();
    this.toolbarOption = null;
  };
}
