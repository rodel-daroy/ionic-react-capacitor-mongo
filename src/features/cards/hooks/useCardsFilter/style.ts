import styled from 'styled-components';
import { IonIcon } from '@ionic/react';

export const StyledTrigger = styled(IonIcon)<{ isActive: boolean }>`
    cursor: pointer;
    padding: 4px;
    font-size: 28px;
    color: ${({ isActive }) => (isActive ? 'var(--ion-color-primary)' : 'currentColor')};
`;
export const StyledWrapper = styled.div``;
export const StyledFilters = styled.div`
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
