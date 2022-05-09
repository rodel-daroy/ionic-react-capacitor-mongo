import { IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledWrapper = styled.li`
    margin-bottom: 32px;
    list-style: none;
`;

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding: 0 15px 0 20px;
    border-bottom: 2px solid #dfdfdf;
`;

export const StyledTitle = styled.h3`
    margin: 0;
    text-transform: capitalize;
    font-size: 17px;
    font-weight: bold;
    width: 100%;
    flex-grow: 1;
    color: black;
`;

export const StyledCompleted = styled.span`
    text-transform: uppercase;
    font-size: 14px;
    white-space: nowrap;
    width: auto;
    padding: 0 10px;
    flex-shrink: 0;
    color: black;
`;

export const StyledToggle = styled(IonIcon)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? '' : 'rotateZ(180deg)')};
    transition: transform 120ms ease;
    font-size: 32px;
    flex-shrink: 0;
    color: black;
`;

export const StyledList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    color: black;
`;
export const StyledRewardsList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    width: auto;
    padding: 0 5px;
    flex-shrink: 0;
    color: #999;
`;
