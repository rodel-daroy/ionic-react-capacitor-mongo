import { IonButton } from '@ionic/react';
import styled from 'styled-components';

export const Content = styled.div`
    padding: 15px;
    margin-bottom: 100px;
`;

export const Footer = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    margin: 0;
    padding: 15px 10px;
    background: white;
`;

export const BuyButton = styled(IonButton)`
    width: 100%;
    --padding-start: 0;
    --padding-end: 0;
    --background: var(--fanzone-orange);
    --background-activated: var(--fanzone-orange);
    --background-focused: var(--fanzone-orange);
    --background-hover: var(--fanzone-orange);
`;
