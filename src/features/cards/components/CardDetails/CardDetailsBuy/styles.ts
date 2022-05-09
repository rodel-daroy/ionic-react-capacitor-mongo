import { IonButton, IonCol, IonRow } from '@ionic/react';
import styled from 'styled-components';

export const Content = styled.div`
    padding: 12px;
`;

export const ListRow = styled(IonRow)`
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
`;

export const ListCol = styled(IonCol)`
    font-size: 14px;
    font-weight: 400;
`;

export const BuyButton = styled(IonButton)`
    height: 25px;
    font-size: 13px;
    font-weight: 500;
    --background: var(--fanzone-orange);
`;
