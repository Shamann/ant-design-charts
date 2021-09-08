import { WrapEditor } from '@ant-design/charts';
import { Form, Input } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';

const InputComponent: React.FC<any> = (props) => {
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
    <Fragment>
      <label>标签: </label>
      <Input value={label} onChange={onLabelChange} placeholder={placeholder} disabled={disabled} />
    </Fragment>
  );
};

export const Rename: React.FC = (props) => {
  return (
    <WrapEditor {...props}>
      {(config, plugin) => <InputComponent {...props} plugin={plugin} config={config} />}
    </WrapEditor>
  );
};
