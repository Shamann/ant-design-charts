import React from 'react';
import { ContextRegistry, RxModel, GraphCommandRegistry } from '@ali/xflow-core';
import { ToolbarConfig } from '../config';
import { IModel } from '../interface';
interface IContext {
  contextService: ContextRegistry;
  commands: GraphCommandRegistry;
  config: ToolbarConfig;
  model: RxModel<IModel>;
}

export const PanelContext = React.createContext<IContext>({
  model: null,
  config: null,
  commands: null,
  contextService: null,
});

export const usePanelContext = () => React.useContext(PanelContext);
