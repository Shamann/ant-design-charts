import React from 'react';
import { IGraphCommandService } from '@ali/xflow-core/es/command/interface';
import {
  XFlowObservableCommands,
  Disposable,
  ContextServiceConstant,
  ContextServiceUtils,
  useContextAsState,
  NsGraph,
  RxModel,
} from '@ali/xflow-core';
import { usePanelContext } from '@ali/xflow-extension';
import { IProps, ISchema } from './interface';
import { NsUpdateObsevableCommand } from '@ali/xflow-core/es/command-contributions/observable/update-observable';
import { Cell } from '@antv/x6';
export namespace NsFormPanel {
  export const id = 'CONFIG_FORM_PANEL_STATE';
  export interface IState {
    loading: boolean;
    schema: ISchema;
    targetType: 'node' | 'edge' | null;
    target: NsGraph.INodeConfig | NsGraph.IEdgeConfig | null;
    targetCell: Cell | null;
  }
}

export const executePanelCommand = (
  cmds: IGraphCommandService,
  updateObservable: (state: NsFormPanel.IState) => Promise<void>,
) => {
  cmds.executeCommand<NsUpdateObsevableCommand.IArgs<NsFormPanel.IState>>(
    XFlowObservableCommands.UPDATE_OBSERVABLE.id,
    {
      getModel: (contextService) => {
        return contextService.useContext(NsFormPanel.id);
      },
      updateObservable: updateObservable,
    },
  );
};

export const useFormPanelData = (props: IProps) => {
  const { formSchemaService: panelSchemaService, targetType = 'node' } = props;
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
        target: null,
        targetCell: null,
        targetType: null,
        loading: false,
      },
      createContext: async (onCtxChange, useContext, self) => {
        const { ctx: selectedCellModel } = await ContextServiceUtils.useSelectedCell(
          contextService,
        );
        console.log(selectedCellModel);

        const nodeDisposable = selectedCellModel.onDidChange(async (cell) => {
          const data: NsFormPanel.IState = await self.getValidValue();

          const updateState = async (cell: Cell, type: 'node' | 'edge') => {
            onCtxChange({
              ...data,
              loading: true,
            });

            const schema = await panelSchemaService({
              cell: cell,
              targetData: cell.getData(),
              targetType: type,
              contextService,
              commands,
            });

            onCtxChange({
              loading: false,
              schema: schema,
              targetType: type,
              target: cell.getData(),
              targetCell: cell,
            });
          };

          if (['all', 'node'].includes(targetType) && cell.isNode()) {
            await updateState(cell, 'node');
          } else if (['all', 'edge'].includes(targetType) && cell.isEdge()) {
            await updateState(cell, 'edge');
          }
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
    targetType: null,
    target: null,
    targetCell: null,
    loading: false,
  });

  return { state, setState, contextService, commands };
};
