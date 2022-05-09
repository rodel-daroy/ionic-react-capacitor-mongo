import { IonImg, IonRadio, IonRadioGroup } from '@ionic/react';
import styled from 'styled-components';

export const StyledContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ItemImage = styled(IonImg)`
    display: block;
    width: 100%;
    height: 230px;
    border-radius: 3px;
    background: white;
    padding: 20px;
`;

export const ItemDetails = styled.div`
    padding: 10px;
    flex-grow: 1;
    background-color: var(--ion-background-color-dark);
    color: var(--ion-text-color-dark);
`;

export const ItemName = styled.span`
    display: block;
    font-size: 17px;
    font-weight: 700;
    line-height: 16px;
    white-space: normal;
    margin: 10px 0 5px;
`;

export const ItemBadge = styled.span`
    display: inline-block;
    padding: 1px 7px 1px 7px;
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    color: black;
    background-color: #65ffc8;
    border-radius: 9.5px;
    margin-bottom: 5px;
`;

export const ItemCardsCount = styled.span`
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    margin-right: 15px;
`;

export const ItemPrice = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
`;

export const RadioGroup = styled(IonRadioGroup)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    padding: 20px 0 10px;
`;

export const RadioButton = styled(IonRadio)`
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    color: #ffffff66;
    border-radius: 50%;

    &[aria-checked='true'] {
        color: var(--ion-color-primary);
        background-color: var(--ion-color-primary-contrast);
        ::part(container) {
            --color-checked: var(--ion-color-primary-contrast);
        }
    }
    &:after {
        content: attr(value);
        display: block;
        position: absolute;
        width: 25px;
        text-align: center;
        left: calc(50% - 12px);
        bottom: calc(50% - 10px);
        font-weight: bold;
        pointer-events: none;
    }
    ::part(mark) {
        --color-checked: transparent;
    }
`;
