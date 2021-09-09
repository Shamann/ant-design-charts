import { XFlowGraphCommands } from '@ali/xflow-core';

export namespace CANVAS_TOOLBAR_ITEMS {
  export const ZOOM_IN = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-in';
  export const ZOOM_OUT = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-out';
  export const SCALE_TO_ONE = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-one';
  export const SCALE_TO_FIT = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-fit';
}

export const TOOLBAR_TYPE = 'CANVAS_SCALE_TOOLBAR';
