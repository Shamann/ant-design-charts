import { inject, singleton } from '@alipay/mana-syringe';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  OneToOneOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import {
  IconStore,
  XFlowGraphCommands,
  GraphCommandRegistry,
  IToolbarContribution,
  ToolbarRegistry,
  ContextServiceUtils,
} from '@ali/xflow-core';

import { NsGraphCmd } from '@ali/xflow-core/es/command-contributions/interface';
import { CANVAS_TOOLBAR_ITEMS } from './constant';

export const MAX_SCALE = 1.5;
export const MIN_SCALE = 0.05;

const zoomOptions = {
  maxScale: MAX_SCALE,
  minScale: MIN_SCALE,
};

/**
 * 扩展默认菜单项目
 */
@singleton({ contrib: IToolbarContribution })
export class CanvasToolbarContribution implements IToolbarContribution {
  /** 获取commandRegistry */
  @inject(GraphCommandRegistry)
  protected readonly commandRegistry: GraphCommandRegistry;

  /** 注册toolbar items */
  public registerToolbarItems(registry: ToolbarRegistry): void {
    IconStore.set('ZoomInOutlined', ZoomInOutlined);
    IconStore.set('ZoomOutOutlined', ZoomOutOutlined);
    IconStore.set('OneToOneOutlined', OneToOneOutlined);
    IconStore.set('CompressOutlined', CompressOutlined);

    registry.registerItem<NsGraphCmd.GraphZoom.IArgs>({
      id: CANVAS_TOOLBAR_ITEMS.ZOOM_IN,
      command: XFlowGraphCommands.GRAPH_ZOOM.id,
      tooltip: '放大',
      iconName: 'ZoomInOutlined',
      cmdOptions: async (item, ctxService) => ({
        args: { factor: 0.1, zoomOptions: zoomOptions },
      }),
    });

    registry.registerItem<NsGraphCmd.GraphZoom.IArgs>({
      id: CANVAS_TOOLBAR_ITEMS.ZOOM_OUT,
      command: XFlowGraphCommands.GRAPH_ZOOM.id,
      tooltip: '缩小',
      iconName: 'ZoomOutOutlined',
      cmdOptions: async (item, ctxService) => ({
        args: { factor: -0.1, zoomOptions: zoomOptions },
      }),
    });

    registry.registerItem<NsGraphCmd.GraphZoom.IArgs>({
      id: CANVAS_TOOLBAR_ITEMS.SCALE_TO_ONE,
      command: XFlowGraphCommands.GRAPH_ZOOM.id,
      iconName: 'OneToOneOutlined',
      tooltip: '缩放到1:1',
      cmdOptions: async (item, ctxService) => ({
        args: { factor: 'real', zoomOptions: zoomOptions },
      }),
      useContext: async (ctxService, setState) => {
        const { ctx } = await ContextServiceUtils.useGraphScale(ctxService);
        ctx.onDidChange((value) => {
          setState((state) => {
            const { zoomFactor } = value;
            if (zoomFactor === 1) {
              state.isEnabled = false;
            } else {
              state.isEnabled = true;
            }
            return state;
          });
        });
      },
    });

    registry.registerItem<NsGraphCmd.GraphZoom.IArgs>({
      id: CANVAS_TOOLBAR_ITEMS.SCALE_TO_FIT,
      command: XFlowGraphCommands.GRAPH_ZOOM.id,
      tooltip: '缩放到适应屏幕',
      iconName: 'CompressOutlined',
      cmdOptions: async (item, ctxService) => ({
        args: { factor: 'fit', zoomOptions: zoomOptions },
      }),
    });
  }
}
