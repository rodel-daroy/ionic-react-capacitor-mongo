import { IonButton } from '@ionic/react';
import styled from 'styled-components';

export const Button = styled(IonButton)`
    --background-color: var(--ion-color-primary);
    --border-radius: 10px;
    color: var(--ion-color-primary--contrast);
    height: 45px;
    font-weight: bold;
`;
