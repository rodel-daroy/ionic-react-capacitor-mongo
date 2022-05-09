import {
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonGrid,
    IonActionSheet,
    IonAlert,
    IonLoading,
} from '@ionic/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';

import { selectCardsOnSaleByMetaCardIds, selectMetaCardById } from 'src/features/cards/cardsSlice';
import { ICard } from 'src/features/cards/types';
import { purchaseCardFromMarket } from 'src/features/market';
import { STATUS } from 'src/utility';
import { BuyButton, Content, ListCol, ListRow } from './styles';

type IProps = {
    metaCardId: string;
    onClose?: () => void;
};

export const CardDetailsBuy: React.FC<IProps> = ({ metaCardId, onClose }: IProps) => {
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));
    const cards = useSelector((state: RootState) => selectCardsOnSaleByMetaCardIds(state, [metaCardId]));
    const [selectedCard, setSelectedCard] = useState<ICard>();
    const [showPaymentMethodSelection, setShowPaymentMethodSelection] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'igc'>();
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const [error, setError] = useState<Error>();

    const handlePurchase = useCallback(() => {
        if (!selectedCard || !paymentMethod || status !== STATUS.IDLE) return;
        setStatus(STATUS.LOADING);
        void dispatch(purchaseCardFromMarket({ cardId: selectedCard._id, paymentMethod }))
            .then(() => {
                setStatus(STATUS.SUCCESSFUL);
                setSelectedCard(undefined);
                setPaymentMethod(undefined);
            })
            .catch((e) => {
                setSelectedCard(undefined);
                setPaymentMethod(undefined);
                setStatus(STATUS.FAILED);
                setError(e);
            });
    }, [dispatch, paymentMethod, selectedCard, status]);

    const handleSelect = useCallback(
        (card: ICard) => {
            setSelectedCard(card);
            setShowPaymentMethodSelection(true);
        },
        [setSelectedCard],
    );

    const renderCards = useMemo(() => {
        return (
            <IonGrid>
                <ListRow>
                    <ListCol>Mint</ListCol>
                    <ListCol>Seller</ListCol>
                    <ListCol>IGC</ListCol>
                    <ListCol></ListCol>
                </ListRow>
                {cards.map((card) => (
                    <ListRow key={card._id}>
                        <ListCol>{card.mintNumber}</ListCol>
                        <ListCol>{card.user.username}</ListCol>
                        <ListCol>{card.price}</ListCol>
                        <ListCol>
                            <BuyButton onClick={() => handleSelect(card)}>Buy</BuyButton>
                        </ListCol>
                    </ListRow>
                ))}
            </IonGrid>
        );
    }, [cards, handleSelect]);

    return (
        <IonContent>
            <Content>
                <IonToolbar>
                    <IonTitle>Market</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>x</IonButton>
                    </IonButtons>
                </IonToolbar>
                Av. Price {metaCard?.priceAvg} IGC
                {renderCards}
            </Content>

            {/* Select Payment Method */}
            <IonActionSheet
                mode="ios"
                isOpen={Boolean(showPaymentMethodSelection)}
                onDidDismiss={() => setShowPaymentMethodSelection(false)}
                header="Payment Method"
                buttons={[
                    {
                        text: 'In-Game Coins',
                        handler: () => {
                            setPaymentMethod('igc');
                            setShowPaymentMethodSelection(false);
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ]}
            />

            {/* Confirm Purchase Modal */}
            <IonAlert
                isOpen={Boolean(paymentMethod)}
                header={intl.formatMessage({
                    defaultMessage: 'Confirm your purchase',
                    description: 'Header message of the confirm-purchase modal within the Market-Buy page.',
                })}
                message={intl.formatMessage(
                    {
                        defaultMessage: 'Do you want to buy Mint {item} for {price} IGC?',
                        description: 'Sub-Header message of the confirm-purchase modal within the Market-Buy page.',
                    },
                    { price: selectedCard?.price, item: selectedCard?.mintNumber },
                )}
                buttons={[
                    {
                        text: intl.formatMessage({
                            defaultMessage: 'Cancel',
                            description: 'Label for Cancel button.',
                        }),
                        role: 'cancel',
                        handler: () => {
                            setPaymentMethod(undefined);
                            setSelectedCard(undefined);
                        },
                    },
                    {
                        text: intl.formatMessage({ defaultMessage: 'Buy', description: 'Label for Buy button.' }),
                        handler: () => handlePurchase(),
                    },
                ]}
            />

            {/* Purchase-Successful Modal */}
            <IonAlert
                isOpen={status === STATUS.SUCCESSFUL}
                header={intl.formatMessage({
                    defaultMessage: 'Well done!',
                    description: 'Header message of the purchase-successful modal within the Market-Buy page.',
                })}
                message={intl.formatMessage({
                    defaultMessage: 'Your purchase was successful!',
                    description: 'Sub-Header message of the purchase-successful modal within the Market-Buy page.',
                })}
                buttons={[
                    {
                        role: 'cancel',
                        text: intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Label for Close button.',
                        }),
                        handler: () => {
                            setStatus(STATUS.IDLE);
                        },
                    },
                ]}
            />

            {/* Purchase-Failed Modal */}
            {error && error.message?.includes('Insufficient funds') ? (
                <IonAlert
                    isOpen={Boolean(error)}
                    header={intl.formatMessage({
                        defaultMessage: "You don't have insufficient FZC to buy this card.",
                        description: 'Header message of the insufficient funds error within the Market-Buy page.',
                    })}
                    buttons={[
                        {
                            role: 'cancel',
                            text: intl.formatMessage({
                                defaultMessage: 'Cancel',
                                description: 'Label for Cancel button.',
                            }),
                            handler: () => {
                                setStatus(STATUS.IDLE);
                                setError(undefined);
                            },
                        },
                        {
                            text: intl.formatMessage({
                                defaultMessage: 'Top-up',
                                description: 'Label for Top-up button.',
                            }),
                            handler: () => {
                                setStatus(STATUS.IDLE);
                                setError(undefined);
                            },
                        },
                    ]}
                />
            ) : (
                <IonAlert
                    isOpen={Boolean(error)}
                    header={intl.formatMessage({
                        defaultMessage: 'Purchase failed',
                        description: 'Header message of the purchase-failed error within the Market-Buy page.',
                    })}
                    message={error?.message}
                    buttons={[
                        {
                            text: intl.formatMessage({ defaultMessage: 'OK', description: 'Label for OK button.' }),
                            handler: () => {
                                setStatus(STATUS.IDLE);
                                setError(undefined);
                            },
                        },
                    ]}
                />
            )}

            <IonLoading isOpen={status === STATUS.LOADING} />
        </IonContent>
    );
};
