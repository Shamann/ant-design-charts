import { FormWrapper } from '@ant-design/charts';
import { InputNumber } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';

const PositionComponent: React.FC<any> = (props) => {
  const { config, plugin = {} } = props;
  const { data } = config;
  const { updateNode } = plugin;

  const [x, setX] = useState<string>(data?.x);
  const [y, setY] = useState<string>(data?.y);
  useEffect(() => {
    setX(data?.x);
    setY(data?.y);
  }, [config]);

  return (
    <Fragment>
      <label>X: </label>
      <InputNumber
        value={x}
        onChange={(value) => {
          setX(value);
          updateNode({
            x: value,
          });
        }}
      />
      <label>Y: </label>
      <InputNumber
        value={y}
        onChange={(value) => {
          setY(value);
          updateNode({
            y: value,
          });
        }}
      />
    </Fragment>
  );
};

export const Position: React.FC = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => <PositionComponent {...props} plugin={plugin} config={config} />}
    </FormWrapper>
  );
};
