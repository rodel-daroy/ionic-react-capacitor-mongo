import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectOwnedMetaCardIds } from 'src/features/cards/cardsSlice';
import { StyledCollectionProgress, StyledCollectionStats, StyledCount, StyledPercentage, StyledWrapper } from './style';

interface IProps {
    metaCardIds: string[];
}
export const MetaCardsCollectedProgress: React.FC<IProps> = React.memo(function MetaCardsCollectedProgress({
    metaCardIds,
}: IProps) {
    const ownedMetaCardIds = useSelector(selectOwnedMetaCardIds);
    const ownedFilterdCards = useMemo(() => ownedMetaCardIds.filter((id) => metaCardIds.includes(id)), [
        ownedMetaCardIds,
        metaCardIds,
    ]);

    const progressPercentage = useMemo(() => Math.round((ownedFilterdCards.length / (metaCardIds.length || 1)) * 100), [
        ownedFilterdCards.length,
        metaCardIds.length,
    ]);

    return (
        <StyledWrapper>
            <StyledCollectionStats>
                <StyledCount>{metaCardIds.length} cards</StyledCount>
                <StyledPercentage>
                    {ownedFilterdCards.length}/{metaCardIds.length}{' '}
                    <FormattedMessage defaultMessage="cards" description="Label for 'percentage of collected cards'" />
                </StyledPercentage>
            </StyledCollectionStats>
            <StyledCollectionProgress value={progressPercentage / 100}></StyledCollectionProgress>
        </StyledWrapper>
    );
});
