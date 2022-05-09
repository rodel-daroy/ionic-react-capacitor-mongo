import { IonIcon, IonActionSheet, useIonRouter, IonAlert, IonLoading } from '@ionic/react';
import { layers } from 'ionicons/icons';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'src/boot/types';
import { selectMetaPackById } from 'src/features/packs';
import { Button, Drawer } from 'src/components';
import { buyShopItem, selectShopItemById } from '../shopSlice';
import {
    ItemImage,
    ItemDetails,
    ItemName,
    ItemBadge,
    ItemCardsCount,
    ItemPrice,
    RadioGroup,
    RadioButton,
    StyledContainer,
} from './styles';

import credit from 'src/assets/images/credit.png';
import { useIntl } from 'react-intl';
import { STATUS } from 'src/utility';
import { useAppDispatch } from 'src/boot/store';
import { unwrapResult } from '@reduxjs/toolkit';

type ShopListItemDetailPageProps = RouteComponentProps<{
    shopItemId: string;
    zoneId: string;
    segment: string;
}>;

const ShopListItemDetailed: React.FC<ShopListItemDetailPageProps> = ({
    match: {
        params: { shopItemId, zoneId, segment },
    },
}: ShopListItemDetailPageProps) => {
    const intl = useIntl();
    const dispatch = useAppDispatch();
    const [paymentMethod, setPaymentMethod] = useState<'igc'>();
    const { push } = useIonRouter();
    const shopItem = useSelector((state: RootState) => selectShopItemById(state, shopItemId));
    const metaPack = useSelector((state: RootState) =>
        shopItem?._metaPack_id ? selectMetaPackById(state, shopItem._metaPack_id) : null,
    );
    const [numItems, setNumItems] = useState<number>(1);
    const [showPaymentSheet, setShowPaymentSheet] = useState(false);
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const [error, setError] = useState<Error>();

    const itemImage =
        shopItem && shopItem.type === 'PACK' && shopItem._metaPack_id && metaPack ? metaPack.imageUrl : credit;

    const renderPackInfo = useMemo(() => {
        return (
            shopItem &&
            shopItem.type === 'PACK' &&
            shopItem._metaPack_id &&
            metaPack && (
                <>
                    <ItemCardsCount>
                        <IonIcon icon={layers}></IonIcon> {metaPack.cardsInPack} CARDS
                    </ItemCardsCount>
                    <ItemBadge>{metaPack.edition}</ItemBadge>
                </>
            )
        );
    }, [metaPack, shopItem]);

    const redirectAfterPurchase = useCallback(() => {
        if (shopItem?.type === 'PACK') {
            return push(`/zone/${zoneId}/collect/packs`);
        }

        if (shopItem?.type === 'TOKEN') {
            return push(`/zone/${zoneId}/collect/cards`);
        }
    }, [shopItem, push, zoneId]);

    const renderTokenInfo = useMemo(() => {
        return (
            shopItem &&
            shopItem.type === 'TOKEN' && (
                <>
                    <ItemCardsCount>
                        <IonIcon icon={layers}></IonIcon> {shopItem.value || 0} FZC
                    </ItemCardsCount>
                </>
            )
        );
    }, [shopItem]);

    const handleClose = useCallback(() => {
        push(`/zone/${zoneId}/shop/${segment || ''}`, 'root');
    }, [push, segment, zoneId]);

    const handlePurchase = useCallback(() => {
        if (status === STATUS.LOADING || !shopItem || !paymentMethod) return;
        setStatus(STATUS.LOADING);
        setPaymentMethod(undefined);
        void dispatch(buyShopItem({ id: shopItem._id, numItems, paymentMethod }))
            .then(unwrapResult)
            .then(() => {
                setStatus(STATUS.SUCCESSFUL);
            })
            .catch((e) => {
                setStatus(STATUS.FAILED);
                setError(e);
            });
    }, [status, shopItem, paymentMethod, dispatch, numItems]);

    return (
        <Drawer onClose={handleClose} title="Shop">
            {{
                body: (
                    <StyledContainer>
                        <ItemImage src={itemImage}></ItemImage>
                        <ItemDetails>
                            {renderPackInfo}
                            {renderTokenInfo}
                            <ItemName>{shopItem?.name}</ItemName>
                            <ItemPrice>{shopItem?.price} FZC</ItemPrice>
                            <RadioGroup value={numItems} onIonChange={(e) => setNumItems(e.detail.value)}>
                                <RadioButton slot="start" value={1} />
                                <RadioButton slot="start" value={2} />
                                <RadioButton slot="start" value={3} />
                                <RadioButton slot="start" value={5} />
                                <RadioButton slot="start" value={10} />
                            </RadioGroup>
                            <Button expand="block" onClick={() => setShowPaymentSheet(true)}>
                                Buy
                            </Button>
                        </ItemDetails>

                        <IonActionSheet
                            mode="ios"
                            isOpen={showPaymentSheet}
                            onDidDismiss={() => setShowPaymentSheet(false)}
                            header="Payment Method"
                            buttons={[
                                {
                                    text: 'In-Game Coins',
                                    handler: () => {
                                        setPaymentMethod('igc');
                                        setShowPaymentSheet(false);
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
                                    defaultMessage: 'Do you want to {numItems}x {item} for {price} IGC?',
                                    description:
                                        'Sub-Header message of the confirm-purchase modal within the Market-Buy page.',
                                },
                                { price: (shopItem?.price || 0) * numItems, item: shopItem?.name, numItems },
                            )}
                            buttons={[
                                {
                                    text: intl.formatMessage({
                                        defaultMessage: 'Cancel',
                                        description: 'Label for Cancel button.',
                                    }),
                                    role: 'cancel',
                                    handler: () => setPaymentMethod(undefined),
                                },
                                {
                                    text: intl.formatMessage({
                                        defaultMessage: 'Buy',
                                        description: 'Label for Buy button.',
                                    }),
                                    handler: () => handlePurchase(),
                                },
                            ]}
                        />

                        {/* Purchase-Successful Modal */}
                        <IonAlert
                            isOpen={status === STATUS.SUCCESSFUL}
                            header={intl.formatMessage({
                                defaultMessage: 'Well done!',
                                description:
                                    'Header message of the purchase-successful modal within the Market-Buy page.',
                            })}
                            message={intl.formatMessage({
                                defaultMessage: 'Your purchase was successful!',
                                description:
                                    'Sub-Header message of the purchase-successful modal within the Market-Buy page.',
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
                                        redirectAfterPurchase();
                                    },
                                },
                            ]}
                        />

                        {/* Purchase-Failed Modal */}
                        {error && error.message?.includes('Insufficient funds') ? (
                            <IonAlert
                                isOpen={Boolean(error)}
                                header={intl.formatMessage({
                                    defaultMessage: 'Your credit is insufficient',
                                    description:
                                        'Header message of the insufficient funds error within the Market-Buy page.',
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
                                    description:
                                        'Header message of the purchase-failed error within the Market-Buy page.',
                                })}
                                message={error?.message}
                                buttons={[
                                    {
                                        text: intl.formatMessage({
                                            defaultMessage: 'OK',
                                            description: 'Label for OK button.',
                                        }),
                                        handler: () => {
                                            setStatus(STATUS.IDLE);
                                            setError(undefined);
                                        },
                                    },
                                ]}
                            />
                        )}

                        <IonLoading isOpen={status === STATUS.LOADING} />
                    </StyledContainer>
                ),
            }}
        </Drawer>
    );
};
export default ShopListItemDetailed;
