import { IonButton } from '@ionic/react';
import styled from 'styled-components';

export const SliderWrapper = styled.div`
    padding: 15px;
    margin-bottom: 130px;
`;

export const SlidePageIndicator = styled.span`
    position: absolute;
    top: 20px;
    right: 20px;
    color: #737373;
    font-size: 12px;
    font-weight: 700;
    z-index: 1;
`;

export const SlideBackBtn = styled(IonButton)`
    position: absolute;
    left: 0;
    font-size: 10px;
    color: #252525;
    --background: transparent;
    --background-activated: transparent;
    --background-focused: transparent;
    --background-hover: transparent;
    --box-shadow: none;
`;

export const SlideFowardBtn = styled(SlideBackBtn)`
    position: absolute;
    left: unset;
    right: 0;
`;

export const Footer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    bottom: 0;
    margin: 0;
    padding: 15px 10px;
    background: white;
`;

export const EditSaleWraper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const SellButton = styled(IonButton)`
    width: 100%;
    --padding-start: 0;
    --padding-end: 0;
    --color: var(--fanzone-orange);
    --background: white;
    --background-activated: white;
    --background-focused: white;
    --background-hover: white;
    --border-style: solid;
    --border-color: var(--fanzone-orange);
    --border-width: 1px;
    --border-radius: 4px;
`;

export const EditButton = styled(SellButton)`
    --color: #999;
    border-color: #999;
`;

export const CurrentPrice = styled.span`
    width: inherit;
    color: var(--fanzone-orange);
    font-size: 17px;
    font-weight: 400;
    text-align: center;
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
