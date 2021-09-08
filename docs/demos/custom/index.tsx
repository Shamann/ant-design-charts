// import { EditorShape } from './custom-editor';
import { Rename } from './rename';
import { Position } from './position';

/** 自定义form控件 */
export const controlMapService = (controlMap) => {
  controlMap.set('custom-rename', Rename);
  controlMap.set('custom-position', Position);
  return controlMap;
};
