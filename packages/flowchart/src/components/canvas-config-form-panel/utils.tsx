import { usePositionStyle } from '@ali/xflow-core';
import { IPanelProps } from './interface';
import { PANEL_HEADER_HEIGHT, PANEL_FOOTER_HEIGHT } from './constants';

export const usePanelLyaoutStyle = (config: IPanelProps, noSchema: boolean) => {
  const headerHeight =
    (config && config.headerPosition && config.headerPosition.height) || PANEL_HEADER_HEIGHT;
  const footerHeight =
    (config.footerPosition && config.footerPosition.height) || PANEL_FOOTER_HEIGHT;

  if (noSchema) {
    return {
      headerStyle: usePositionStyle({
        height: headerHeight,
        lineHeight: headerHeight,
        top: 0,
        left: 0,
        right: 0,
        ...config.headerPosition,
      }),
      bodyStyle: usePositionStyle({
        left: 0,
        right: 0,
        top: headerHeight,
        bottom: footerHeight,
        ...config.bodyPosition,
      }),
      footerStyle: usePositionStyle({
        left: 0,
        right: 0,
        lineHeight: footerHeight,
        height: footerHeight,
        bottom: 0,
        ...config.footerPosition,
      }),
    };
  }

  return {
    headerStyle: usePositionStyle({
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      ...config.headerPosition,
    }),
    bodyStyle: usePositionStyle({
      left: 0,
      right: 0,
      top: 0,
      bottom: footerHeight,
      ...config.bodyPosition,
    }),
    footerStyle: usePositionStyle({
      left: 0,
      right: 0,
      lineHeight: footerHeight,
      height: footerHeight,
      bottom: 0,
      ...config.footerPosition,
    }),
  };
};
