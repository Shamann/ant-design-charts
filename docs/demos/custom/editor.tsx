import { WrapEditor } from '@ant-design/charts';
import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';

const RenameInput: React.FC<any> = (props) => {
  const { config, plugin = {} } = props;
  const { placeholder, disabled, data } = config;
  const { updateNode } = plugin;
  const [label, setLabel] = useState<string>(data?.label);

  const onLabelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    updateNode({
      label: e.target.value,
    });
  };

  useEffect(() => {
    setLabel(data.label);
  }, [config]);

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
