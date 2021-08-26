import { NsConfigFormPanel } from '@ali/xflow-extension';
import { EditorShape } from './custom-editor';

/** 自定义form控件 */
export enum ControlShapeEnum {
  'EDITOR' = 'EDITOR',
}

export const controlMapService: NsConfigFormPanel.IControlMapService = (controlMap) => {
  controlMap.set(ControlShapeEnum.EDITOR, EditorShape);
  return controlMap;
};
