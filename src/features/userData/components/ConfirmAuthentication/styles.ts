import { IonInput, IonText } from '@ionic/react';
import styled from 'styled-components';

export const ConfirmWrapper = styled.div`
    text-align: center;
    line-height: 1.3em;
    padding: 60px 15px;
`;

export const StyledInput = styled(IonInput)`
    border: 1px solid black;
    border-radius: 4px !important;
    display: flex;
    margin: 20px auto;
    min-height: 50px;
    background: white;
    color: black;
`;

export const ConfirmTextWrapper = styled.div`
    display: flex;
    margin: 0 auto;
`;

export const ConfirmText = styled(IonText)`
    text-align: center;
    display: flex;
    margin: 0 auto;
`;
