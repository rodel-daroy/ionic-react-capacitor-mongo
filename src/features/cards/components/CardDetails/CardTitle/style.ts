import { IonIcon, IonImg, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

export const CardHeader = styled.div`
    position: relative;
    background: white;
    padding: 15px;
    border-radius: 3px;
    margin-bottom: 8px;
    width: 100%;
`;

export const CardHeaderDetails = styled.div`
    color: black;
    text-align: left;
`;
export const CardHeaderTitle = styled.h3`
    margin: 0;
    line-height: 26px;
`;
export const CardSubTitle = styled.h5`
    margin: 0;
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 10px;
`;
export const CardMintLabel = styled.label`
    display: block;
    font-size: 11px;
    font-weight: 700;
`;
export const CardMintValue = styled.span`
    display: block;
    font-size: 11px;
    font-weight: 700;
`;

export const CardImg = styled(IonImg)`
    display: block;
    width: 100%;
    height: 280px;

    ::part(image) {
        pointer-events: none;
    }
`;

export const CardHeaderActions = styled(IonToolbar)`
    display: flex;
    position: absolute;
    bottom: 0px;
    right: 0px;
    align-items: center;
    --background: transparent;
`;

export const CardLikesLabel = styled.span`
    color: black;
    font-size: 11px;
    font-weight: 700;
    margin-right: 10px;
`;

export const CardLikeTick = styled(IonIcon)`
    color: black;
    font-size: 22px;
    margin-right: 5px;
`;
