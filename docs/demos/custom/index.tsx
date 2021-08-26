import { NsConfigFormPanel } from '@ant-design/charts';
import { EditorShape } from './custom-editor';

/** 自定义form控件 */
export enum ControlShapeEnum {
  'RENAME' = 'rename',
}

export const controlMapService: NsConfigFormPanel.IControlMapService = (controlMap) => {
  controlMap.set(ControlShapeEnum.RENAME, EditorShape);
  return controlMap;
};
