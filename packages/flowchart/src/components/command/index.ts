/**
 * 全量 Command，用户通过 name 指定，支持配置式和命令式
 * enum Command {Undo, Redo, Copy, Paste, Remove, ZoomIn, ZoomOut}
 * eg:
 *   配置式：<Command name={name}> ReactNode </Command>;
 *   命令式：graphInstance.ZoomIn(factor: number);
 */

/** UNDO 操作 */
const UNDO_CMD = 'undo';
/** REDO 操作 */
const REDO_CMD = 'redo';
/** Graph Zoom */
const GRAPH_ZOOM = 'zoom';
/** Graph Copy */
const GRAPH_COPY = 'copy';
/** Graph Paste */
const GRAPH_PASTE = 'paste';

export const Command = [UNDO_CMD, REDO_CMD, GRAPH_ZOOM, GRAPH_COPY, GRAPH_PASTE];
