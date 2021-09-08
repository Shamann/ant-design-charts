import React from 'react';
import { IControlProps } from '../../interface';

export const controls: [string, React.FC<IControlProps>][] = [];

export type IControlMap = Map<string, React.FC<IControlProps>>;

export const makeControlMap = (controls: [string, React.FC<IControlProps>][]) => {
  const controlMap = new Map<string, React.FC<IControlProps>>();
  controls.forEach((item) => {
    const [key, control] = item;
    const uuid = key.toLowerCase();
    if (controlMap.has(uuid)) {
      console.error(`${key} is duplicated in controlMap:`, controlMap);
    }
    controlMap.set(uuid, control);
  });
  return controlMap;
};

export const getControlFromMap = (
  key: string,
  controlMap: Map<string, React.FC<IControlProps>>,
  defaultControl: React.ComponentType<IControlProps>,
) => {
  if (controlMap.has(key)) {
    return controlMap.get(key);
  }
  const uuid = key.toLowerCase();
  if (controlMap.has(uuid)) {
    return controlMap.get(uuid);
  }
  console.warn(`${key} is not exist in controlmap, fallback to defaultControl`);
  return defaultControl;
};
