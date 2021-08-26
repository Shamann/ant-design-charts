import {
  NsGraphCmd,
  XFlowGraphCommands,
  ContextServiceUtils,
  XFlowNodeCommands,
  FormItemWrapper,
  usePanelContext,
} from '@ant-design/charts';
import { Form, Input } from 'antd';
import React, { useState } from 'react';

export const EditorShape: React.FC<IControlProps> = (props) => {
  const { controlSchema } = props;
  const { required, tooltip, extra, name, label, placeholder } = controlSchema;

  return (
    <FormItemWrapper schema={controlSchema}>
      {({ disabled, hidden, initialValue }) => {
        return (
          <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
            tooltip={tooltip}
            extra={extra}
            required={required}
            hidden={hidden}
          >
            {/* 这里的组件可以拿到onChange和value */}
            <Editor controlSchema={controlSchema} placeholder={placeholder} disabled={disabled} />
          </Form.Item>
        );
      }}
    </FormItemWrapper>
  );
};

interface IEditorProps extends IFormItemProps {
  controlSchema: IControlSchema;
  placeholder?: string;
  disabled: boolean;
}

const Editor: React.FC<IEditorProps> = (props) => {
  const { placeholder, disabled, onChange, value: propsValue } = props;
  const { commands, contextService } = usePanelContext();
  const [nodes, setNodes] = useState([]);

  const getParseValue = (value: string | undefined) => {
    if (!value) {
      return {};
    }
    return JSON.parse(value)?.nodes[0];
  };
  console.log(props);

  const [label, setLabel] = useState<string>(getParseValue(propsValue).label);

  React.useEffect(() => {
    commands.executeCommand(XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
      saveGraphDataService: async (meta, graph) => {
        /** 当前选中节点数据 */
        const { nodes, data } = await ContextServiceUtils.useSelectedNodes(contextService);
        setNodes(nodes);
        /** 拿到数据，触发onChange*/
        onChange?.(JSON.stringify(graph));
        return { err: null, data: graph, meta };
      },
    } as NsGraphCmd.SaveGraphData.IArgs);
  }, [propsValue]);

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    commands.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
      nodeConfig: {
        ...getParseValue(propsValue),
        label: e.target.value,
      },
    });
  };

  return (
    <Input value={label} onChange={onLabelChange} placeholder={placeholder} disabled={disabled} />
  );
};
