import React, { useState, useCallback } from 'react';
import {
  NsGraphCmd,
  XFlowGraphCommands,
  ContextServiceUtils,
  XFlowNodeCommands,
  XFlowEdgeCommands,
  NsEdgeCmd,
} from '@ali/xflow-core';
// import { useAsync } from 'react-use';
import useAsync from './useAsync';
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
  const { commands, contextService } = usePanelContext();

  const getSelectNode = useCallback(async () => {
    const { data: shape } = await ContextServiceUtils.useSelectedNodes(contextService);
    return shape?.[0]?.data;
  }, [props]);

  const { value, loading } = useAsync(getSelectNode);

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
    console.log(currentNodeData);

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

  if (loading) {
    return null;
  }

  return (
    <FormItemWrapper schema={controlSchema}>
      {(config) => {
        return children({ ...controlSchema, data: value }, { updateNode, updateEdge });
      }}
    </FormItemWrapper>
  );
};
