import React, { ReactNode } from 'react';
import { StyledInformationWidget, StyledInformationWidgetModal } from './style';

interface IProps {
    content: ReactNode;
}
export const InformationWidget: React.FC<IProps> = (props: IProps) => {
    const { content, ...otherProps } = props;
    return (
        <>
            <StyledInformationWidget {...otherProps}>i</StyledInformationWidget>
            <StyledInformationWidgetModal>{content}</StyledInformationWidgetModal>
        </>
    );
};
