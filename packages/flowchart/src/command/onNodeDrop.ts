import { NsNodeTreePanel } from '@ali/xflow-extension';
import { XFlowNodeCommands, uuidv4 } from '@ali/xflow-core';
import { NsNodeCmd } from '@ali/xflow-core/es/command-contributions/interface';

export const onNodeDrop: NsNodeTreePanel.IOnNodeDrop = async (node, commands) => {
  const args: NsNodeCmd.AddNode.IArgs = {
    nodeConfig: { ...node, id: uuidv4() },
  };
  commands.executeCommand(XFlowNodeCommands.ADD_NODE.id, args);
};
