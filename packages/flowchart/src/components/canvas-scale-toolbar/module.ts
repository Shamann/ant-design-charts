/* eslint-disable @typescript-eslint/no-redeclare */
import 'reflect-metadata';
/** Application 扩展依赖 */
/** Toolbar扩展 */
import { CanvasToolbarContribution } from './canvas-toolbar-contributions';
import { Module } from '@alipay/mana-syringe';

/** 依赖扩展模块，必须要加载 */
export const createModule = (config: any) => {
  return Module((register) => {
    /** 扩展 Toolbar 配置 */
    register(CanvasToolbarContribution);
  });
};
