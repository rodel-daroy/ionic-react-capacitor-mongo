import { IonImg } from '@ionic/react';
import styled from 'styled-components';

export const ItemWrapper = styled.li`
    display: inline-block;
    padding: 7.5px;
    vertical-align: top;
    cursor: pointer;
`;

export const ItemImage = styled(IonImg)`
    display: block;
    width: 100%;
    height: 230px;
    border-radius: 3px;
    background: white;
    margin-bottom: 9px;
    padding: 20px;
`;

export const ItemName = styled.span`
    display: block;
    width: 130px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    white-space: normal;
    margin-bottom: 5px;
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
    display: block;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ItemPrice = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
`;
