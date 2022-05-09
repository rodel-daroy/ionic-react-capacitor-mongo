import { IonButton, IonImg } from '@ionic/react';
import styled from 'styled-components';

export const StyledPacksList = styled.ul`
    list-style: none;
    padding: 2.5px;
`;

export const StyledMetaPackWrapper = styled.li`
    display: grid;
    grid-template-columns: 45% 1fr;
    padding: 10px;
`;

export const StyledMetaPackImage = styled(IonImg)`
    display: block;
    width: 100%;
    padding: 20px;
    border-radius: 3px;
    background: white;
`;

export const StyledMetaPackInfo = styled.div`
    padding: 15px 15px 0;
`;

export const StyledMetaPackName = styled.span`
    display: block;
    width: 130px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    white-space: normal;
    margin-bottom: 10px;
`;

export const StyledMetaPackBadge = styled.span`
    display: inline-block;
    padding: 1px 7px 1px 7px;
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    color: black;
    background-color: #65ffc8;
    border-radius: 9.5px;
    margin-bottom: 10px;
`;

export const StyledMetaPackCardsCount = styled.span`
    display: block;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 40px;
`;

export const StyledMetaPackOwnedCount = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 15px;
`;

export const StyledOpenButton = styled(IonButton)`
    font-weight: 500;
    font-size: 13px;
    --color: var(--fanzone-orange);
    --background: transparent;
    border: 1px solid var(--fanzone-orange);
    border-radius: 10px;
`;
