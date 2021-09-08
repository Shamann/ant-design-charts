import React from 'react';
import { IProps } from './interface';
import { usePanelContext } from '@ali/xflow-extension';

export interface IHeaderProps extends IProps {
  hasSchema: boolean;
}

export const PanelHeader: React.FC<IHeaderProps> = (props) => {
  const { prefixClz, hasSchema } = props;
  const { config } = usePanelContext();
  const panelProps = config.getComponentProps<IProps>();

  if (hasSchema) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={`${prefixClz}-header`} style={props.style}>
        {panelProps.header && React.isValidElement(panelProps.header) && panelProps.header}
        {!panelProps.header && (
          <div className={`${prefixClz}-header-title`}>{panelProps.headerText || 'Panel'}</div>
        )}
      </div>
    </React.Fragment>
  );
};
