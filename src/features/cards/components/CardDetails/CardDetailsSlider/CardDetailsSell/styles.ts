import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import styled from 'styled-components';

export const Content = styled.div`
    padding: 12px;
`;

export const CardInfo = styled.div`
    margin: 14px;
`;

export const CardName = styled.h3`
    margin-bottom: 6px;
`;

export const CardMintNumber = styled.span`
    font-size: 12px;
    font-weight: 700;
`;

export const CardSellPrice = styled(IonItem)`
    --color: #999;
    --background: #f0f0f0;
    border-radius: 5px;
    margin-bottom: 14px;
`;

export const CardSellPriceLabel = styled(IonLabel)`
    font-size: 17px;
    font-weight: 400;
`;

export const CardSellPriceInput = styled(IonInput)`
    color: black;
    font-size: 21px;
    font-weight: 400;
    text-align: right;

    &:after {
        content: 'IGC';
        display: block;
        color: black;
    }
`;

export const CardPriceDetails = styled.div``;

export const CardPriceLabel = styled.label``;

export const CardPriceValue = styled.span``;

export const SaveButton = styled(IonButton)`
    width: 100%;
`;

export const WithdrawButton = styled(IonButton)`
    width: 100%;
`;
