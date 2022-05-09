import { IonIcon, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

export const StyledToolbar = styled(IonToolbar)`
    --background: #000000;
    --min-height: 64px;
    color: white;
`;

export const StyledImage = styled.img`
    height: 42px;
    display: block;
    cursor: pointer;
`;

export const StyledIcon = styled(IonIcon)`
    margin-right: 6px;
    font-size: 18px;
`;

export const StyledActivities = styled.div<{ hasUnreadNotifications: boolean }>`
    margin: 0 8px;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    display: flex;

    &::after {
        content: '';
        opacity: ${({ hasUnreadNotifications }) => (hasUnreadNotifications ? 1 : 0)};
        background-color: green;
        border: 2px solid white;
        width: 8px;
        height: 8px;
        border-radius: 999px;
        position: absolute;
        top: -3px;
        right: -3px;
    }
`;
