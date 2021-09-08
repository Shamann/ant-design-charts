import React from 'react';
import { IProps } from './interface';
import { NsFormPanel } from './service';
import { usePanelContext } from '@ali/xflow-extension';

export interface IFooterProps extends IProps {
  state: NsFormPanel.IState;
}

export const PanelFooter: React.FC<IFooterProps> = (props) => {
  const { config } = usePanelContext();
  const panelProps = config.getComponentProps<IProps>();

  return (
    <React.Fragment>
      <div className={`${props.prefixClz}-footer`} style={props.style}>
        {panelProps.footer && React.isValidElement(panelProps.footer) && panelProps.footer}
        {!panelProps.footer && (
          <div className={`${props.prefixClz}-footer-title`}>{panelProps.footerText}</div>
        )}
      </div>
    </React.Fragment>
  );
};
