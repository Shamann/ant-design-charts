import React from 'react';

export const RegisterNode1 = (props) => {
  const { size = {}, data } = props;

  const { width = 60, height = 40 } = size;
  return (
    <div
      style={{
        width,
        height,
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span> {data?.label}</span>
    </div>
  );
};
