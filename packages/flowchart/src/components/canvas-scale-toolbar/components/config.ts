import { createToolbarConfig } from '../../toolbar-panel/module';
import { CANVAS_TOOLBAR_ITEMS } from '../constant';

export const useConfig = createToolbarConfig((toolbarConfig) => {
  toolbarConfig.setOptions({
    mainGroups: [
      {
        items: [
          CANVAS_TOOLBAR_ITEMS.ZOOM_IN,
          CANVAS_TOOLBAR_ITEMS.ZOOM_OUT,
          CANVAS_TOOLBAR_ITEMS.SCALE_TO_FIT,
          CANVAS_TOOLBAR_ITEMS.SCALE_TO_ONE,
        ],
      },
    ],
  });
});
