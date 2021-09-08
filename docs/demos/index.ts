import type { NsConfigFormPanel } from '@ant-design/charts';
import { controlMapService, ControlShapeEnum } from './custom';

export const formSchemaService: NsConfigFormPanel.IFormSchamaService = async (args) => {
  const { currentNode, contextService } = args;
  const { useContext } = contextService;
  // const data = await useContext();
  // console.log();
  console.log(args);

  /** 获取 graphMeta */

  const nodeSchema: NsConfigFormPanel.ISchema = {
    tabs: [
      {
        name: '属性',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '重命名',
                name: 'Tab1-0',
                /** 使用自定义shape */
                shape: 'custom-editor',
                disabled: false,
                required: false,
                tooltip: 'rename',
                placeholder: 'please write something',
                value: '',
                defaultValue: '12', // 可以认为是默认值
                hidden: false,
                options: [{ title: '', value: '' }],
                originData: {}, // 原始数据
              },
            ],
          },
        ],
      },
      {
        name: '位置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '图表宽度',
                name: 'Tab1-1',
                /** 使用自定义shape */
                shape: 'Input',
                disabled: false,
                required: false,
                tooltip: 'set width',
                placeholder: 'please write something',
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

export const formValueUpdateService: NsConfigFormPanel.IFormValueUpdateService = (args) => {
  console.log('formValueUpdateService33', args);
};

export { controlMapService };
