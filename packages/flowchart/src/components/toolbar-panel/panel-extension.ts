import { inject, singleton } from '@alipay/mana-syringe';
import { DisposableCollection, Disposable } from '@ali/xflow-core';
import type { IFrontendApplicationContribution } from '@ali/xflow-core';
import { PanelWidget } from './panel-widget';

/** Widget的工厂方法 类型定义 */
export interface IPanelFactory {
  createWidget: () => PanelWidget;
}
/** Widget的工厂方法 */
export const IPanelFactory = Symbol('IPanelFactory');

@singleton()
export class ToolbarPanelExtension implements IFrontendApplicationContribution {
  /** widget工厂*/
  @inject(IPanelFactory)
  private widgetFactory: IPanelFactory;

  /** dispose */
  private toDispose = new DisposableCollection();

  /** provider 生命周期方法  */
  onStart() {
    this.createWidget();
  }

  /** 工厂方法生成widget */
  createWidget = async () => {
    const widget = this.widgetFactory.createWidget();
    /** 触发 widget 生命周期  */
    widget.onStart();

    this.toDispose.push(
      Disposable.create(() => {
        /** 触发 widget 生命周期  */
        widget.onStop();
      }),
    );
  };

  /** provider 生命周期方法  */
  onStop = () => {
    this.toDispose.dispose();
  };
}
