import { IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledHeader = styled.div<{ isOpen: boolean }>`
    display: flex;
    align-items: center;
    padding: 15px;
    background: #252525;
    border-radius: ${({ isOpen }) => (isOpen ? '3px 3px 0 0' : '3px')};
`;

export const ContentWrapper = styled.div`
    padding: 0 15px 15px;
    color: #fff;
    background: #252525;
    border-radius: 0 0 3px 3px;
`;

export const StyledTitle = styled.h3`
    margin: 0;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    width: 100%;
    flex-grow: 1;
    color: #999;
`;

export const StyledToggle = styled(IonIcon)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotateZ(180deg)')};
    transition: transform 120ms ease;
    font-size: 12px;
    flex-shrink: 0;
`;

export const AccordionRow = styled.div`
    display: flex;
    margin-bottom: 8px;
`;

export const AccordionCol = styled.div`
    display: inline-flex;
`;

export const AccordionBadge = styled.div`
    display: inline-block;
    padding: 0.1em 0.55em 0;
    line-height: 1;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    border-radius: 9.5px;
    border: 0.5px solid white;
`;

export const AccordionGoldenBadge = styled(AccordionBadge)`
    background-color: var(--fanzone-orange);
    border-color: var(--fanzone-orange);
`;

export const AccordionLabel = styled.label`
    display: inline-block;
    width: 120px;
    font-size: 14px;
    font-weight: 400;
`;

export const AccordionValue = styled.span`
    font-size: 13px;
    font-weight: 700;
`;
