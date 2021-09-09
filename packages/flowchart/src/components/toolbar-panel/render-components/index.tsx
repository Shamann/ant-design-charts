/**
 * layout:
 * main-toolbar extra-toolbar
 *
 * horizontal left->right
 * flex space-between
 *
 * vertical top->bottom
 * position absolute
 *
 * horizontal-center center
 * .x6-toolbar-content{ justify-content: center; }
 */

import React from 'react';
import classnames from 'classnames';
import { Toolbar } from '@antv/x6-react-components';
import { useContextServiceModel } from '@ali/xflow-core/es/common/hooks';
import {
  IToolbarGroupProps,
  IToolbarRenderProps,
  IToolbarLayout,
} from '@ali/xflow-core/es/toolbar/interface';
import { usePanelContext } from './context';
import { ToolbarGroup } from './toolbar-group';

import '../style/index.less';

export interface IProps {}

export const XFlowToolbar: React.FC<IProps> = (props) => {
  const { contextService, model: toolbarModel } = usePanelContext();
  const [model] = useContextServiceModel<IToolbarRenderProps>(toolbarModel, contextService);

  const { mainGroups = [], extraGroups = [], layout } = model;

  const clz = classnames({
    [layout]: true,
    ['xflow-toolbar-root']: true,
  });

  return (
    <div className={clz}>
      {mainGroups.length > 0 && (
        <ToolbarRender key="mainGroups" groups={mainGroups} layout={layout} toolbarModel={model} />
      )}
      {extraGroups.length > 0 && (
        <ToolbarRender
          key="extraGroups"
          groups={extraGroups}
          layout={layout}
          toolbarModel={model}
        />
      )}
    </div>
  );
};

/** 根据IToolbarGroupProps生成uuid key */
const useUuid = (group: IToolbarGroupProps) => {
  const key = React.useMemo(() => {
    return group.items.reduce((acc, i) => acc + i.id, '');
  }, [group.items]);
  return key;
};

/** render toolbar */
const ToolbarRender: React.FC<{
  toolbarModel: IToolbarRenderProps;
  groups: IToolbarGroupProps[];
  layout: IToolbarLayout;
}> = (props) => {
  const { groups, layout, toolbarModel } = props;
  const { hoverEffect = true } = toolbarModel;
  return (
    <Toolbar hoverEffect={hoverEffect}>
      {groups.map((g) => {
        const key = useUuid(g);
        return <ToolbarGroup group={g} layout={layout} key={key} />;
      })}
    </Toolbar>
  );
};
