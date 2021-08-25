import { NsNodeTreePanel } from '@ali/xflow-extension';

/** 节点查找 */
export const searchService: NsNodeTreePanel.ISearchService = async (
  treeNodeList: NsNodeTreePanel.ITreeNode[] = [],
  keyword: string,
) => {
  const list = treeNodeList.filter((i) => i.isDirectory || i.label.includes(keyword));
  return list;
};
