import React, { useCallback, useEffect, useMemo } from 'react';
import { IonContent, IonPage, IonTitle, useIonRouter } from '@ionic/react';
import {
    fetchCardsOnSale,
    fetchMetaPacks,
    Header,
    selectCurrentZone,
    selectShopItemsByType,
    fetchAllShopItems,
    selectCardsOnSaleWithLimit,
} from 'src/features';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
//styles
import {
    HomeWrapperOuter,
    HomeWrapperInner,
    ImageWrapper,
    DFBImage,
    MetaPackWrapper,
    MetaPackItemContainer,
    MetaPackItem,
    MetaPackImage,
    MetaPackNameContainer,
    MetaPackName,
    ZoneTitleBackground,
    ZoneTitle,
    CardListingsSection,
    CardListingWrapper,
    CardListing,
    CardBorder,
    CardImageWrapper,
    CardImage,
    CardStatsWrapper,
    CardStatsLeft,
    CardName,
    CardPosition,
    CardEdition,
    CardMinPrice,
    CardStatsRight,
} from './styles';
import { card_pack, DFB_Offizielles } from '../../../assets/images';
import { useRouteMatch } from 'react-router';
import { RootState } from '../../../boot/types';

const Home: React.FC = () => {
    const listingLimit = 5;
    const dispatch = useAppDispatch();
    const currentZone = useSelector(selectCurrentZone);
    const cardsOnSale = useSelector((state: RootState) => selectCardsOnSaleWithLimit(state, listingLimit));
    const { push } = useIonRouter();

    const {
        params: { zoneId },
    } = useRouteMatch<{ zoneId: string }>();

    const shopItems = useSelector((state: RootState) => {
        return selectShopItemsByType(state, 'PACK');
    });

    useEffect(() => {
        void dispatch(fetchAllShopItems());
        void dispatch(fetchMetaPacks());
        void dispatch(fetchCardsOnSale(listingLimit));
    }, [dispatch]);

    const sortedCardsOnSale = useMemo(() => {
        const cards = [...cardsOnSale];
        cards.sort((card1, card2) => {
            if (card1.onSaleDate && card2.onSaleDate) {
                return card1.onSaleDate.getTime() - card2.onSaleDate.getTime();
            }
            return card1.onSaleDate ? -1 : 1;
        });
        return cards;
    }, [cardsOnSale]);

    const navigateToCardDetails = useCallback(
        (metaCardId: string) => {
            return push(`/zone/${zoneId}/collect/cards/${metaCardId}`);
        },
        [push, zoneId],
    );

    const navigateToPackDetails = useCallback(
        (metaPackId: string) => {
            return push(`/zone/${zoneId}/shop/packs/${metaPackId}`);
        },
        [push, zoneId],
    );

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <HomeWrapperOuter>
                    <ZoneTitleBackground>
                        <ZoneTitle>{currentZone?.name}</ZoneTitle>
                    </ZoneTitleBackground>
                    <HomeWrapperInner>
                        <div>
                            <div>
                                <ImageWrapper>
                                    <DFBImage src={DFB_Offizielles} />
                                </ImageWrapper>
                                <MetaPackWrapper>
                                    {shopItems.map((shopItem) => {
                                        return (
                                            <MetaPackItemContainer
                                                key={shopItem._id}
                                                onClick={() => navigateToPackDetails(shopItem._id)}
                                            >
                                                <MetaPackItem>
                                                    <MetaPackImage src={card_pack} />
                                                </MetaPackItem>
                                                <MetaPackNameContainer>
                                                    <MetaPackName class="ion-text-wrap">{shopItem.name}</MetaPackName>
                                                </MetaPackNameContainer>
                                            </MetaPackItemContainer>
                                        );
                                    })}
                                </MetaPackWrapper>
                                <IonTitle>Latest Listings</IonTitle>
                                <CardListingsSection>
                                    {sortedCardsOnSale.map((card) => {
                                        return (
                                            <CardListingWrapper
                                                key={card._id}
                                                onClick={() => navigateToCardDetails(card.metaCard._id)}
                                            >
                                                <CardListing>
                                                    <CardImageWrapper>
                                                        <CardImage src={card.metaCard?.imageUrl} />
                                                    </CardImageWrapper>
                                                    <CardStatsWrapper>
                                                        <CardStatsLeft>
                                                            <CardName>{card.metaCard.title}</CardName>
                                                            <CardPosition>
                                                                {
                                                                    card.metaCard.cardStats.find(
                                                                        (stat) => stat.name === 'jersey',
                                                                    )?.value
                                                                }
                                                            </CardPosition>
                                                        </CardStatsLeft>
                                                        <CardStatsRight>
                                                            <CardEdition>{card.metaCard.edition}</CardEdition>
                                                            <CardMinPrice>{card.price} FCZ</CardMinPrice>
                                                        </CardStatsRight>
                                                    </CardStatsWrapper>
                                                </CardListing>
                                                <CardBorder></CardBorder>
                                            </CardListingWrapper>
                                        );
                                    })}
                                </CardListingsSection>
                            </div>
                        </div>
                    </HomeWrapperInner>
                </HomeWrapperOuter>
            </IonContent>
        </IonPage>
    );
};

export default Home;
