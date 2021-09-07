import React, { useState } from 'react';
import {
  NsGraphCmd,
  XFlowGraphCommands,
  ContextServiceUtils,
  XFlowNodeCommands,
  XFlowEdgeCommands,
  NsEdgeCmd,
} from '@ali/xflow-core';
import { usePanelContext, FormItemWrapper } from '@ali/xflow-extension';
import type { IControlProps } from '@ali/xflow-extension/es/canvas-config-form-panel/interface';

export interface IEditor {
  children: (
    config: Object,
    plugin: { updateNode: (params: Object) => void; updateEdge: (params: Object) => void },
  ) => React.ReactElement;
}

export const WrapEditor: React.FC<IControlProps & IEditor> = (props) => {
  const { controlSchema, children } = props;
  const [data, setData] = useState();

  const { commands, contextService } = usePanelContext();

  const getSelectNode = async () => {
    const { data: shape } = await ContextServiceUtils.useSelectedNodes(contextService);
    return shape?.[0]?.data;
  };

  const getSelectEdge = async () => {
    const { data: shape } = await ContextServiceUtils.useSelectedNodes(contextService);
    return shape?.[0]?.data;
  };

  React.useEffect(() => {
    commands.executeCommand(XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
      saveGraphDataService: async (meta, graph) => {
        return { err: null, data: graph, meta };
      },
    } as NsGraphCmd.SaveGraphData.IArgs);
  }, [props]);

  const updateNode = async (value: Object) => {
    const currentNodeData = await getSelectNode();
    commands.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
      nodeConfig: {
        ...currentNodeData,
        ...value,
      },
    });
  };

  const updateEdge = async (value: Object) => {
    const currentEdgeData = await getSelectEdge();
    commands.executeCommand(XFlowEdgeCommands.UPDATE_EDGE.id, {
      edgeConfig: {
        ...currentEdgeData,
        ...value,
      },
    } as NsEdgeCmd.UpdateEdge.IArgs);
  };

  console.log('props', controlSchema);
  return (
    <FormItemWrapper schema={controlSchema}>
      {(config) => {
        return children(config, { updateNode, updateEdge });
      }}
    </FormItemWrapper>
  );
};
