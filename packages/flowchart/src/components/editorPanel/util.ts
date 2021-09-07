import type { NsConfigFormPanel } from '@ali/xflow-extension';

export const defaultFormSchemaService: NsConfigFormPanel.IFormSchamaService = async (args) => {
  const { currentNode } = args;
  const nodeSchema: NsConfigFormPanel.ISchema = {
    tabs: [
      {
        name: '基本信息',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                name: 'Tab1-1',
                shape: 'Input',
                disabled: false,
                required: false,
                tooltip: 'set width',
                value: '',
                defaultValue: '', // 可以认为是默认值
                hidden: false,
                options: [{ title: '', value: '' }],
                originData: {}, // 原始数据
              },
            ],
          },
        ],
      },
    ],
  };
  if (currentNode) {
    return nodeSchema;
  }
  return {
    tabs: [],
  };
};

export const defaultUpdateService: NsConfigFormPanel.IFormValueUpdateService = async (args) => {};
