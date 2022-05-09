import { IonContent, IonSpinner } from '@ionic/react';
import React, { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';
import { selectCurrentZone } from 'src/features/appData';
import { fetchMetaCardsByZoneId } from 'src/features/cards/cardsSlice';
import { useCardsFilter } from 'src/features/cards/hooks/useCardsFilter';
import { STATUS } from 'src/utility';
import { MetaCard } from '../MetaCard';
import { MetaCardsCollectedProgress } from '../MetaCardsCollectedProgress';
import { StyledButton, StyledList, StyledNoResults } from './style';

export const CardsSegment: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentZone = useSelector(selectCurrentZone);
    const { status } = useSelector((state: RootState) => state.cards.metaCards);

    const { CardsFilter, filterResult, isLoading, resetFilters } = useCardsFilter({
        quickFilters: {
            favorites: true,
            ownedCardsOnSale: true,
            myCards: true,
        },
    });

    useEffect(() => {
        if (!currentZone || status !== STATUS.IDLE) return;
        void dispatch(fetchMetaCardsByZoneId(currentZone._id));
        const interval = setInterval(() => {
            void dispatch(fetchMetaCardsByZoneId(currentZone._id));
        }, 15000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentZone, dispatch]);

    const renderedMetaCards = useMemo(
        () =>
            filterResult.metaCardIds.length > 0 ? (
                filterResult.metaCardIds.map((metaCardId) => <MetaCard key={metaCardId} metaCardId={metaCardId} />)
            ) : (
                <StyledNoResults>
                    <FormattedMessage
                        defaultMessage="No filter results."
                        description="No-Filter-Results message in card-list"
                    />
                    <StyledButton fill="clear" onClick={resetFilters}>
                        <FormattedMessage defaultMessage="Reset filter" description="Reset filter button label" />
                    </StyledButton>
                </StyledNoResults>
            ),
        [filterResult.metaCardIds, resetFilters],
    );

    return (
        <IonContent>
            {isLoading ? (
                <IonSpinner />
            ) : (
                <React.Fragment>
                    {CardsFilter}
                    <MetaCardsCollectedProgress metaCardIds={filterResult.metaCardIds} />
                    <StyledList>{renderedMetaCards}</StyledList>
                </React.Fragment>
            )}
        </IonContent>
    );
};

export default CardsSegment;
