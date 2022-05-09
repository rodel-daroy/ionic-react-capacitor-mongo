import styled from 'styled-components';
import { IonContent, IonHeader, IonModal } from '@ionic/react';

const SHADOW = '0px 4px 4px 0px rgba(0, 0, 0, 0.25)';

export const StyledModal = styled(IonModal)`
    .modal-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
    }
`;

export const StyledDrawerHeader = styled(IonHeader)`
    box-shadow: ${SHADOW};
    --ion-toolbar-background: var(--ion-background-color-dark);
    --ion-toolbar-color: var(--ion-text-color-dark);

    ion-toolbar {
        --min-height: 41px;
    }
`;

export const StyledDrawerContent = styled(IonContent)`
    --background: #efefef;
`;
