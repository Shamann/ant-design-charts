import React from 'react';
import { IProps } from './interface';
import { NsTreePanelData } from './service';
import { usePanelContext } from '@ali/xflow-extension';

export interface IFooterProps extends IProps {
  state: NsTreePanelData.IState;
}

export const NodePanelFooter: React.FC<IFooterProps> = (props) => {
  const { prefixClz } = props;
  const { config } = usePanelContext();
  const panelProps = config.getComponentProps<IProps>();

  return (
    <React.Fragment>
      <div className={`${prefixClz}-footer`} style={props.style}>
        {panelProps.footer && React.isValidElement(panelProps.footer) && panelProps.footer}
      </div>
    </React.Fragment>
  );
};
