import type { NsConfigFormPanel } from '@ant-design/charts';
import { controlMapService, ControlShapeEnum } from './custom';

export const formSchemaService: NsConfigFormPanel.IFormSchamaService = async (args) => {
  const { currentNode, contextService } = args;
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
                shape: 'custom-rename',
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
                label: 'X',
                name: 'Tab1-1',
                /** 使用自定义shape */
                shape: 'custom-position',
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
