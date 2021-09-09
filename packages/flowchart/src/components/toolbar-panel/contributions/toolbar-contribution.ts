import { singleton, inject } from '@alipay/mana-syringe';
import { IToolbarContribution, ToolbarRegistry } from '@ali/xflow-core';
import {} from '@ali/xflow-core';
import { GraphCommandRegistry } from '@ali/xflow-core';

/**
 * 扩展默认菜单项目
 */
@singleton({ contrib: IToolbarContribution })
export class ToolbarDefaultContribution implements IToolbarContribution {
  /** 获取commandRegistry */
  @inject(GraphCommandRegistry)
  protected readonly commandRegistry: GraphCommandRegistry;

  /** 注册toolbar items */
  public registerToolbarItems(registry: ToolbarRegistry): void {}
}
