import React from 'react';
import { Disposable, ContextServiceConstant, useContextAsState, NsGraph } from '@ali/xflow-core';
import { usePanelContext } from '@ali/xflow-extension';
import { IProps, ISchema } from './interface';

export namespace NsFormPanel {
  export const id = 'CONFIG_FORM_PANEL_STATE';
  export interface IState {
    loading: boolean;
    schema: ISchema;
    nodeData: NsGraph.INodeConfig | null;
  }
}

export const useFormPanelData = (props: IProps) => {
  const { formSchemaService: panelSchemaService } = props;
  const { contextService, commands } = usePanelContext();
  React.useEffect(() => {
    /** 已注册时直接返回 */
    if (contextService.hasContext(NsFormPanel.id)) {
      return;
    }
    /** 注册成为全局状态，方便其他组件联动 */
    contextService.registerContext<NsFormPanel.IState>({
      id: NsFormPanel.id,
      initialValue: {
        schema: { tabs: [] },
        nodeData: null,
        loading: false,
      },
      createContext: async (onCtxChange, useContext, self) => {
        const SelectedNodeModel = await useContext(ContextServiceConstant.SELECTED_NODE.id);
        // const SelectedEdgesModel = await useContext(ContextServiceConstant.SELECTED_EDGES.id);
        // console.log(8888, SelectedEdgesModel);

        const nodeDisposable = SelectedNodeModel.onDidChange(async (nodeData) => {
          const data: NsFormPanel.IState = await self.getValidValue();

          onCtxChange({
            ...data,
            loading: true,
          });

          const schema = await panelSchemaService({
            currentNode: nodeData,
            contextService,
            commands,
          });

          onCtxChange({
            loading: false,
            schema: schema,
            nodeData: nodeData,
          });
        });

        return Disposable.create(() => {
          nodeDisposable.dispose();
        });
      },
    });
  }, []);

  /** 已注册时直接返回 */
  const [state, setState] = useContextAsState<NsFormPanel.IState>(NsFormPanel.id, contextService, {
    schema: { tabs: [] },
    nodeData: null,
    loading: false,
  });

  return { state, setState, contextService, commands };
};
