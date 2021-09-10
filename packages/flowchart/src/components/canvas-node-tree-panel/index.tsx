import React from 'react';
import { useXflowPrefixCls } from '@ali/xflow-core';
import { WorkspacePanel } from '@ali/xflow-extension';
import { IProps, IPanelProps } from './interface';
import { NodePanelBody } from './panel-body';
import { NodePanelHeader } from './panel-header';
import { NodePanelFooter } from './panel-footer';
import { usePanelLyaoutStyle } from './utils';
import { useTreePanelData } from './service';

import './style/index';

export const NodeTreePanelMain: React.FC<IProps> = (props) => {
  const { headerStyle, bodyStyle, footerStyle } = usePanelLyaoutStyle(props as IPanelProps);

  const { state, onFolderExpand, onKeywordChange } = useTreePanelData(props);

  return (
    <>
      <NodePanelHeader
        {...props}
        state={state}
        style={headerStyle}
        onKeywordChange={onKeywordChange}
      />
      <NodePanelBody {...props} state={state} style={bodyStyle} onFolderExpand={onFolderExpand} />
      <NodePanelFooter {...props} state={state} style={footerStyle} />
    </>
  );
};

export const NodeTreePanel: React.FC<IProps> = (props) => {
  const prefixClz = useXflowPrefixCls('node-panel');
  return (
    <WorkspacePanel {...props} className={prefixClz}>
      <NodeTreePanelMain {...props} prefixClz={prefixClz} />
    </WorkspacePanel>
  );
};
