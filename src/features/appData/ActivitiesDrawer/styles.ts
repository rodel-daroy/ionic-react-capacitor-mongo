import { IonContent, IonHeader, IonIcon, IonPage, IonSegment, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

export const StyledPage = styled(IonPage)`
    background-color: var(--ion-background-color);
`;

export const StyledToolbar = styled(IonToolbar)`
    --padding-start: 8px;
    --padding-top: 4px;
    --padding-bottom: 4px;
    --padding-end: 8px;
    --min-height: 41px;
`;
export const StyledSegment = styled(IonSegment)`
    max-width: 230px;
    --ion-background-color: white;
    --background: rgba(0, 0, 0, 0.06);

    ion-segment-button {
        --indicator-color: white;
    }
`;

export const StyledHeader = styled(IonHeader)``;
export const StyledHeader2 = styled(IonToolbar)`
    display: flex;
    padding: 12px 10px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dfdfdf;

    --ion-toolbar-background: white;
    --color: black;
`;
export const StyledContent = styled(IonContent)`
    --ion-background-color: white;
    --color: black;
`;

export const StyledTitle = styled.h2`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
    color: grey;
`;

export const StyledIcon = styled(IonIcon)`
    cursor: pointer;
    font-size: 52px;
    margin-right: 8px;
    margin-left: -8px;
    height: 32px;
`;

export const StyledAlpha = styled.div`
    background-color: #b659ff;
    width: 58px;
    margin: auto 30px;
    font-size: 13px;
    color: white;
    padding: 2px 10px;
    border-radius: 999px;
`;
