import React, { useCallback, useRef, useState } from 'react';
import { StyledAccordion, StyledAccordionHeader, StyledAccordionContent } from './style';

interface IProps {
    children: {
        header: React.FC<{ isOpen: boolean }>;
        content: React.FC<{ isOpen: boolean }>;
    };
    initialState?: boolean;
}
export const Accordion: React.FC<IProps> = ({
    children: { header: Header, content: Content },
    initialState,
}: IProps) => {
    const [isOpen, setIsOpen] = useState(Boolean(initialState));
    const content = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        if (!content.current) return;

        /* If the accordion is initially open, clientHeight will be > 0 */
        if (
            content.current.clientHeight > 0 ||
            (content.current.style.maxHeight && content.current.style.maxHeight !== '0px')
        ) {
            /* We set maxHeight to enable the transition form current height to 0
             * The setTimeout is required to help the browser register the maxHeight */
            content.current.style.maxHeight = `${content.current.scrollHeight}px`;
            setTimeout(() => (content.current!.style.maxHeight = '0px'), 0);
        } else content.current.style.maxHeight = `${content.current.scrollHeight}px`;
        setIsOpen((prev) => !prev);
    }, [content]);

    return (
        <StyledAccordion>
            <StyledAccordionHeader onClick={handleClick}>
                <Header isOpen={isOpen} />
            </StyledAccordionHeader>
            <StyledAccordionContent ref={content} initialState={initialState} isOpen={isOpen}>
                <Content isOpen={isOpen} />
            </StyledAccordionContent>
        </StyledAccordion>
    );
};
