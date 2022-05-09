import { IonButton, IonImg } from '@ionic/react';
import { gridGap } from 'src/components/Grid/style';
import styled from 'styled-components';

export const CardWrapper = styled.li`
    display: inline-block;
    width: calc(50% - ${gridGap} / 2);
    vertical-align: top;
    margin-bottom: 40px;

    display: inline-block;
    width: 50%;
    padding-bottom: 92%;
    vertical-align: top;
    position: relative;
`;

export const CardInner = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 7.5px;
    > * {
        flex-shrink: 0;
    }
`;

export const ImageWrapper = styled.div<{ isOwned: boolean }>`
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: white;
    margin-bottom: 9px;
    padding: 5px 15px;
    opacity: ${({ isOwned }) => (isOwned ? 1 : 0.5)};

    ion-spinner {
        position: absolute;
    }
`;

export const CardImage = styled(IonImg)`
    display: block;
    width: 100%;
`;

export const CardName = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const CardBadge = styled.span`
    display: inline-block;
    padding: 1px 7px 1px 7px;
    font-size: 10px;
    font-weight: bold;
    border: 1px solid white;
    background-color: transparent;
    border-radius: 9.5px;
    margin-bottom: 10px;
`;

export const CardPosition = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
`;

export const CardBuyButton = styled(IonButton)`
    width: 70px;
    height: 26px;
    margin: 0;
    margin-right: 10px;
    font-size: 13px;
    font-weight: 500;
    color: white;
    --background: var(--fanzone-orange);
    border-radius: 6px;
`;

export const CardSellButton = styled(CardBuyButton)`
    color: var(--fanzone-orange);
    --background: white;
`;

export const CardActionSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const CardActionInfo = styled.span`
    font-size: 12px;
`;
