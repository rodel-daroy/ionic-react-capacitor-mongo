import { IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledQuickFilter = styled.div<{ isActive: boolean; mode: 'light' | 'dark' }>`
    background-color: ${({ mode, isActive }) => {
        if (mode === 'dark') return isActive ? 'white' : '#252525';
        if (mode === 'light') return isActive ? '#FF8101' : 'white';
    }};
    color: ${({ mode, isActive }) => {
        if (mode === 'dark') return isActive ? '#252525' : 'white';
        if (mode === 'light') return isActive ? 'white' : '#252525';
    }};
    border-width: 1px;
    border-color: white;
    border-style: ${({ mode }) => (mode === 'dark' ? 'solid' : 'none')};
    border-radius: 999px;
    font-size: 14px;
    padding: 6px 10px;
    margin: 4px;
    display: inline-block;
    cursor: pointer;
    white-space: nowrap;
`;
export const StyledIcon = styled(IonIcon)``;

export const StyledWrapper = styled.div`
    cursor: pointer;
    padding: 6px 10px;
    font-size: 14px;
`;
