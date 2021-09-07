// import { EditorShape } from './custom-editor';
import { Editor } from './editor';

/** 自定义form控件 */
export const controlMapService = (controlMap) => {
  controlMap.set('custom-editor', Editor);
  return controlMap;
};
