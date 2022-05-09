import React, { ReactNode, useCallback } from 'react';
import { Accordion } from 'src/components';

interface IProps {
    isOpen?: boolean;
    title: string;
    children: ReactNode;
}

export const AccountSettingsAccordion: React.FC<IProps> = ({ isOpen, title, children }: IProps) => {
    const header = useCallback(() => <p style={{ fontWeight: 'bold' }}>{title}</p>, [title]);
    const content = useCallback(() => <React.Fragment>{children}</React.Fragment>, [children]);
    return (
        <Accordion initialState={isOpen}>
            {{
                header,
                content,
            }}
        </Accordion>
    );
};
