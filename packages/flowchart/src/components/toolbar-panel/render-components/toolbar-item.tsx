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
import { useCmdContextService } from '@ali/xflow-core';
import { IconStore } from '@ali/xflow-core';
import { IToolbarItemProps, IToolbarLayout } from '@ali/xflow-core/es/toolbar/interface';
import { usePanelContext } from './context';

export interface IProps {
  item: IToolbarItemProps;
  layout: IToolbarLayout;
}

export const ToolbarItem: React.FC<IProps> = (props) => {
  const { contextService } = usePanelContext();
  const { item, layout } = props;

  const [state] = useCmdContextService(item, contextService);
  const Icon = IconStore.get(state.iconName);

  const clz = classnames({
    ['xflow-toolbar-item']: true,
  });
  const text = layout === 'vertical' ? '' : state.text;

  const ToolbarItemWrap = state.render;
  if (ToolbarItemWrap) {
    return (
      <ToolbarItemWrap {...state}>
        <Toolbar.Item
          tooltipProps={{
            ...state.tooltipProps,
            placement: layout === 'vertical' ? 'left' : 'bottom',
          }}
          {...state}
          text={text}
          className={clz}
          hidden={!state}
          disabled={!state.isEnabled}
          tooltip={state.tooltip || state.text}
          icon={Icon ? <Icon /> : null}
        />
      </ToolbarItemWrap>
    );
  }
  return (
    <Toolbar.Item
      tooltipProps={{
        ...state.tooltipProps,
        placement: layout === 'vertical' ? 'left' : 'bottom',
      }}
      {...state}
      text={text}
      className={clz}
      hidden={!state}
      disabled={!state.isEnabled}
      tooltip={state.tooltip || state.text}
      onClick={state.onItemClick}
      icon={Icon ? <Icon /> : null}
    />
  );
};
