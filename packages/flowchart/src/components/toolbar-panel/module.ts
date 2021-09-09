import 'reflect-metadata';
/** Application 扩展依赖 */
import { IFrontendApplicationContribution } from '@ali/xflow-core';
/** Panel模块 */
import { ToolbarConfig } from './config';
import { PanelWidget } from './panel-widget';
import { ToolbarPanelExtension, IPanelFactory } from './panel-extension';
import { usePanelContext as useAppContext } from './render-components/context';
import { Module } from '@alipay/mana-syringe';
import { ToolbarDefaultContribution } from './contributions/toolbar-contribution';
import { createToolbarConfig } from './components';
/** export */
export { ToolbarConfig, createToolbarConfig, useAppContext };

/** 依赖扩展模块，必须要加载 */
export const createModule = (toolbarConfig: ToolbarConfig) => {
  return Module((register) => {
    /** 扩展 Toolbar 配置 */
    register(ToolbarDefaultContribution);

    const moduleId = Symbol('ToolbarPanelExtension');

    register(moduleId, {
      /** 注册 NodeTreeExtension 到 IFrontendApplicationContribution */
      contrib: IFrontendApplicationContribution,
      useDynamic: (ctx) => {
        const { container } = ctx;
        const child = container.createChild();

        /** 绑定 widget 配置 */
        child.register<ToolbarConfig>(ToolbarConfig, { useValue: toolbarConfig });

        /** 绑定 widget 类  */
        child.register<PanelWidget>(PanelWidget);

        /** 绑定 Widget 工厂类 */
        child.register<IPanelFactory>(IPanelFactory, {
          useDynamic: (ctx) => {
            return {
              createWidget: () => {
                return child.get(PanelWidget);
              },
            };
          },
        });

        /** 绑定 PanelExtension */
        child.register(ToolbarPanelExtension);

        return child.get(ToolbarPanelExtension);
      },
    });
  });
};
