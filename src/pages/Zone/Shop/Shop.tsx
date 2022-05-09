import React, { useCallback, useEffect, useMemo } from 'react';
import { IonButtons, IonContent, IonPage, IonSegment, IonSegmentButton, useIonRouter } from '@ionic/react';
import { fetchAllShopItems, fetchMetaPacks, Header } from 'src/features';
import { useRouteMatch } from 'react-router-dom';
import { SegmentChangeEventDetail } from '@ionic/core';
import { SHOP_SEGMENT } from 'src/features/shop/types';
import { StyledShopHeader, StyledShopHeaderTitle } from './styles';
import { useAppDispatch } from 'src/boot/store';
import { FormattedMessage } from 'react-intl';
import { ShopList } from 'src/features/shop/ShopList';

const Shop: React.FC = () => {
    const dispatch = useAppDispatch();
    const { push } = useIonRouter();
    const match = useRouteMatch<{ zoneId: string; segment?: SHOP_SEGMENT }>();

    const currentSegment = useMemo(() => {
        if (match.params.segment && Object.values(SHOP_SEGMENT).includes(match.params.segment))
            return match.params.segment;

        const val = localStorage.getItem('current_collect_segment');
        if (val && ['tokens', 'packs'].includes(val)) return val;
        return 'packs';
    }, [match.params.segment]);

    useEffect(() => {
        void dispatch(fetchAllShopItems());
        void dispatch(fetchMetaPacks());
    }, [dispatch]);

    const handleSegmentChange = useCallback(
        ({ detail }: CustomEvent<SegmentChangeEventDetail>) => {
            if (detail.value && detail.value !== currentSegment) {
                const value = detail.value || SHOP_SEGMENT.PACKS;
                const direction = 'none';
                push(`/zone/${match.params.zoneId}/shop/${value}`, direction);
                localStorage.setItem('current_shop_segment', detail.value);
            }
        },
        [push, currentSegment, match.params.zoneId],
    );

    return (
        <IonPage>
            <Header />
            <StyledShopHeader>
                <StyledShopHeaderTitle>Shop</StyledShopHeaderTitle>
                <IonButtons slot="end">
                    <IonSegment mode="ios" value={currentSegment} onIonChange={handleSegmentChange}>
                        <IonSegmentButton value="packs">
                            <FormattedMessage
                                defaultMessage="Packs"
                                description="Shop: Segmet-Button label for packs"
                            />
                        </IonSegmentButton>
                        <IonSegmentButton value="tokens">
                            <FormattedMessage
                                defaultMessage="Tokens"
                                description="Shop: Segmet-Button label for tokens"
                            />
                        </IonSegmentButton>
                    </IonSegment>
                </IonButtons>
            </StyledShopHeader>
            <IonContent fullscreen>
                <ShopList />
            </IonContent>
        </IonPage>
    );
};

export default Shop;
