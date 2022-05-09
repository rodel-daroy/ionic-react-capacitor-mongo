import { chevronUp } from 'ionicons/icons';
import React from 'react';
import { Accordion } from 'src/components';
import { StyledHeader, StyledTitle, StyledToggle, ContentWrapper } from './styles';

interface IProps {
    title: string;
    initialState?: boolean;
    children: {
        content: React.FC<{ isOpen: boolean }>;
    };
}
export const CardDetailsAccordion: React.FC<IProps> = ({ title, children: { content: Content } }: IProps) => {
    return (
        <Accordion initialState={true}>
            {{
                header({ isOpen }: { isOpen: boolean }) {
                    return (
                        <StyledHeader isOpen={isOpen}>
                            <StyledTitle>{title}</StyledTitle>
                            <StyledToggle icon={chevronUp} isOpen={isOpen} />
                        </StyledHeader>
                    );
                },
                content({ isOpen }: { isOpen: boolean }) {
                    return (
                        <ContentWrapper>
                            <Content isOpen={isOpen} />
                        </ContentWrapper>
                    );
                },
            }}
        </Accordion>
    );
};
