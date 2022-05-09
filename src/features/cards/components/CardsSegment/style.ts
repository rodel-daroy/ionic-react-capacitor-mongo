import { IonButton } from '@ionic/react';
import styled from 'styled-components';

export const StyledList = styled.ul`
    list-style: none;
    padding: 2.5px;
`;

export const StyledNoResults = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 200px;
    font-weight: bold;
    color: var(--ion-text-color);
`;

export const StyledButton = styled(IonButton)`
    margin-top: 18px;
`;
