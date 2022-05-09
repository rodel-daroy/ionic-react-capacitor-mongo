import { IonLabel, IonListHeader, IonPage, IonProgressBar } from '@ionic/react';
import styled from 'styled-components';

export const StyledPage = styled(IonPage)`
    background: var(--ion-background-color-dark);
    --background: var(--ion-background-color-dark);
`;

export const CollectionStats = styled(IonListHeader)`
    padding: 0 20px;
`;

export const CollectionCount = styled(IonLabel)`
    font-size: 14px;
    font-weight: 700;
`;

export const CollectionPercentage = styled(IonLabel)`
    float: right;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
`;

export const CollectionProgress = styled(IonProgressBar)`
    --progress-background: var(--fanzone-orange);
    --buffer-background: rgb(255 129 1 / 30%);
`;
