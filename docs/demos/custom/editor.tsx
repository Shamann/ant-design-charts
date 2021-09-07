import { WrapEditor } from '@ant-design/charts';
import { Form, Input } from 'antd';
import React, { useState } from 'react';

const RenameInput: React.FC<any> = (props) => {
  console.log(props, 'config');

  const { placeholder, disabled, plugin = {}, value: propsValue } = props;
  const { updateNode } = plugin;

  const [label, setLabel] = useState<string>();

  const onLabelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    updateNode({
      label: e.target.value,
    });
  };

  return (
    <Input value={label} onChange={onLabelChange} placeholder={placeholder} disabled={disabled} />
  );
};

export const Editor: React.FC = (props) => {
  return (
    <WrapEditor {...props}>
      {(config, plugin) => <RenameInput {...props} plugin={plugin} config={config} />}
    </WrapEditor>
  );
};
