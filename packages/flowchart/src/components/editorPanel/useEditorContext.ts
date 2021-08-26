/**
 * 封装一系列 graph 操作
 * eg:
 *  - 提供全局 graph
 */

export const useEditorContext = () => {
  const graph = getGraph();
  return [graph];
};
