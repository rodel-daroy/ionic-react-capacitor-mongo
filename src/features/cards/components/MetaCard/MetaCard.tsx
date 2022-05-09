import { IonSpinner, useIonRouter } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { RootState } from 'src/boot/types';
import { selectMetaCardById } from 'src/features/cards/cardsSlice';
import {
    CardBadge,
    CardImage,
    CardName,
    CardWrapper,
    CardPosition,
    CardBuyButton,
    CardInner,
    CardActionSection,
    CardSellButton,
    ImageWrapper,
    CardActionInfo,
} from './style';

interface IProps {
    metaCardId: string;
}
export const MetaCard: React.FC<IProps> = React.memo(function CardListItem({ metaCardId }: IProps) {
    const router = useIonRouter();
    const {
        params: { tab, zoneId },
    } = useRouteMatch<{ zoneId: string; tab: string }>();
    const metaCard = useSelector((state: RootState) => selectMetaCardById(state, metaCardId));
    const [isLoaded, setIsLoaded] = useState(false);
    const cardOwned = metaCard?.userSpecificFields.owned;

    const showCardDetails = useCallback(() => {
        if (metaCard) router.push(`/zone/${zoneId}/${tab}/cards/${metaCard._id}`);
    }, [metaCard, router, tab, zoneId]);

    return (
        <CardWrapper id={metaCard?._id} onClick={showCardDetails}>
            <CardInner>
                <ImageWrapper isOwned={!!cardOwned}>
                    {!isLoaded && <IonSpinner color="dark" />}
                    <CardImage src={metaCard?.imageUrl} onIonImgDidLoad={() => setIsLoaded(true)} />
                </ImageWrapper>
                <CardName>{metaCard?.title}</CardName>
                <CardPosition>{metaCard?.cardStats.find((stat) => stat.name === 'position')?.value}</CardPosition>
                <CardBadge>{metaCard?.edition}</CardBadge>
                <CardActionSection>
                    <CardBuyButton hidden={cardOwned}>Buy</CardBuyButton>
                    <CardSellButton hidden={!cardOwned}>Sell</CardSellButton>
                    <CardActionInfo hidden={cardOwned}>from {metaCard?.priceMin} IGC</CardActionInfo>
                </CardActionSection>
            </CardInner>
        </CardWrapper>
    );
});
