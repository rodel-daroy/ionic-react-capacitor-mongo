import styled from 'styled-components';

export const StyledAccordion = styled.section``;
export const StyledAccordionHeader = styled.div`
    cursor: pointer;
`;

export const StyledAccordionContent = styled.div<{ initialState?: boolean; isOpen: boolean }>`
    transition: max-height 170ms ease-in-out;
    max-height: ${({ initialState }) => (initialState ? '' : '0')};
    overflow: hidden;
`;
