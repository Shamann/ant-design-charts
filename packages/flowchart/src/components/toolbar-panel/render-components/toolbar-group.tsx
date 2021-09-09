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
import { useContextService } from '@ali/xflow-core';
import { IToolbarGroupProps, IToolbarLayout } from '@ali/xflow-core/es/toolbar/interface';
import { usePanelContext } from './context';
import { ToolbarItem } from '../render-components/toolbar-item';

export interface IProps {
  group: IToolbarGroupProps;
  layout: IToolbarLayout;
}

export const ToolbarGroup: React.FC<IProps> = (props) => {
  const { contextService } = usePanelContext();
  const { group, layout } = props;

  const clz = classnames({
    ['xflow-toolbar-group']: true,
  });

  const [state] = useContextService(group, contextService);
  const { items = [] } = state;

  if (items.length === 0) {
    return null;
  }

  return (
    <Toolbar.Group className={clz}>
      {items.map((item) => (
        <ToolbarItem item={item} layout={layout} key={item.id} />
      ))}
    </Toolbar.Group>
  );
};
