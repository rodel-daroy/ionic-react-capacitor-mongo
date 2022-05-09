import { IonIcon } from '@ionic/react';
import styled from 'styled-components';

export const StyledWrapper = styled.li`
    position: relative;
    padding: 5px 20px;
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 20px;
    grid-template: 'icon rewards' auto 'icon title' auto / 26px 1fr;

    &::after {
        content: '';
        right: 0;
        bottom: 0;
        position: absolute;
        height: 1px;
        width: calc(100% - 66px);
        background-color: #dfdfdf;
    }
`;

export const StyledIconWrapper = styled.div<{ completed: boolean }>`
    grid-area: icon;
    width: 26px;
    height: 26px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 999px;
    background-color: ${({ completed }) => (completed ? 'black' : 'transparent')};

    ${({ completed }) => (completed ? 'ion-icon { visibility: visible; }' : '')}
`;

export const StyledIcon = styled(IonIcon)`
    visibility: hidden;
    font-size: 20px;
    color: white;
    font-weight: bold;
    --ionicon-stroke-width: 42px;
`;

export const StyledRewards = styled.div`
    grid-area: rewards;
    color: #999999;
    display: flex;
    align-items: center;
    margin: 0.9em 0 0;
`;

export const StyledTitle = styled.h4`
    grid-area: title;
    display: flex;
    align-items: center;
    margin: 0 0 0.9em;
`;
