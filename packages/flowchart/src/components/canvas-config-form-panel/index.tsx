import React from 'react';
import { IProps, IPanelProps, ITriggerUpdate } from './interface';
import { useXflowPrefixCls } from '@ali/xflow-core';
// import { WorkspacePanel } from '../workspace-panel/components';
import { WorkspacePanel } from '@ali/xflow-extension';
import { PanelHeader } from './panel-header';
import { PanelBody } from './panel-body';
import { PanelFooter } from './panel-footer';
import { usePanelLyaoutStyle } from './utils';
import { useFormPanelData } from './service';
export { FormItemWrapper } from './schema-form';

import './style/index';

/** useFormPanelData获取数据 */
export const FormPanelMain: React.FC<IProps> = (props) => {
  const { config, getCustomRender, afterUpdatingCb, formValueUpdateService } = props;
  const { state, contextService, commands } = useFormPanelData(props);

  // 联动更新form items的值
  const triggerUpdate = React.useCallback<ITriggerUpdate>(
    async (form, values) => {
      form.setFieldsValue(values);
      const result = await formValueUpdateService({
        values,
        currentNode: state.nodeData,
        contextService,
        commands,
      });
      if (afterUpdatingCb) {
        afterUpdatingCb(result);
      }
    },
    [state.nodeData],
  );

  // 在fields change时的回调
  const onFieldsChange = React.useCallback(
    async (values) => {
      const result = await formValueUpdateService({
        values,
        currentNode: state.nodeData,
        contextService,
        commands,
      });
      if (afterUpdatingCb) {
        afterUpdatingCb(result);
      }
    },
    [state.nodeData],
  );

  /** schema为空的情况  */
  const noSchema = React.useMemo(() => {
    try {
      return state.schema.tabs.length === 0 || !state.schema;
    } catch (error) {
      return true;
    }
  }, [state.schema]);

  const { headerStyle, bodyStyle, footerStyle } = usePanelLyaoutStyle(
    props as IPanelProps,
    noSchema,
  );

  /** 支持自定义渲染 */
  if (getCustomRender) {
    const Component = getCustomRender(state.nodeData, contextService, commands);
    if (Component) {
      return React.createElement(Component, {
        ...props,
        headerStyle,
        bodyStyle,
        footerStyle,
        config: config,
        currentNode: state.nodeData,
        contextService: contextService,
        commands: commands,
      });
    }
  }

  return (
    <React.Fragment>
      <PanelHeader hasSchema={!noSchema} {...props} style={headerStyle} />
      <PanelBody
        {...props}
        style={bodyStyle}
        prefixClz={props.prefixClz}
        loading={state.loading}
        schema={state.schema}
        triggerUpdate={triggerUpdate}
        onFieldsChange={onFieldsChange}
      />
      <PanelFooter {...props} state={state} style={footerStyle} />
    </React.Fragment>
  );
};

/** 获取WorkspacePanel的context */
export const ConfigFormPanel: React.FC<IProps> = (props) => {
  const prefixClz = useXflowPrefixCls('config-form-panel');
  return (
    <WorkspacePanel {...props} className={prefixClz}>
      <FormPanelMain {...props} prefixClz={prefixClz} />
    </WorkspacePanel>
  );
};
