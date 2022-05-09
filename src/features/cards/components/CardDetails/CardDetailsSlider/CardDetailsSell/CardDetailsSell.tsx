import { IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';

import { listCardsOnMarket, selectCardById, withdrawCardFromMarket } from 'src/features/cards/cardsSlice';
import {
    Content,
    CardInfo,
    CardName,
    CardMintNumber,
    CardSellPrice,
    CardPriceDetails,
    CardPriceLabel,
    CardPriceValue,
    SaveButton,
    CardSellPriceLabel,
    CardSellPriceInput,
    WithdrawButton,
} from './styles';

type IProps = {
    cardId: string;
    onClose?: () => void;
};

export const CardDetailsSell: React.FC<IProps> = ({ cardId, onClose }: IProps) => {
    const dispatch = useAppDispatch();
    const card = useSelector((state: RootState) => selectCardById(state, cardId));
    const [price, setPrice] = useState<number>(card?.onSale ? card.price : 0);

    const setOnSale = useCallback(() => {
        if (!card) return;

        void dispatch(listCardsOnMarket({ [cardId]: price })).then(onClose);
    }, [card, cardId, dispatch, onClose, price]);

    const withdrawFromSale = useCallback(() => {
        if (!card) return;

        void dispatch(withdrawCardFromMarket(cardId));
    }, [card, cardId, dispatch]);

    return (
        <IonContent>
            {card && (
                <Content>
                    <IonToolbar>
                        <IonTitle slot="start">{card.onSale ? 'Set Price' : 'Card'}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={onClose}>x</IonButton>
                        </IonButtons>
                    </IonToolbar>
                    {!card.onSale && (
                        <CardInfo>
                            <CardName>{card.metaCard.title}</CardName>
                            <CardMintNumber>{card.mintNumber}</CardMintNumber>
                        </CardInfo>
                    )}
                    <CardSellPrice>
                        <CardSellPriceLabel>Set the price</CardSellPriceLabel>
                        <CardSellPriceInput
                            value={price}
                            type="number"
                            onIonChange={(e) => setPrice(parseInt(e.detail.value!))}
                        ></CardSellPriceInput>
                    </CardSellPrice>
                    <CardPriceDetails>
                        <CardPriceLabel>Recommended Price</CardPriceLabel>
                        <CardPriceValue>{card.metaCard.priceAvg}</CardPriceValue>
                        <CardPriceLabel>Highest Price</CardPriceLabel>
                        <CardPriceValue>{card.metaCard.priceMax}</CardPriceValue>
                    </CardPriceDetails>
                    {card.onSale && <WithdrawButton onClick={withdrawFromSale}>Withdraw from sale</WithdrawButton>}
                    <SaveButton onClick={setOnSale}>Save</SaveButton>
                </Content>
            )}
        </IonContent>
    );
};
