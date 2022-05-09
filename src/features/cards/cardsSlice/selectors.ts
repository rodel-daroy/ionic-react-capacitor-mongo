import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/boot/types';
import { cardsAdapter, metaCardsAdapter } from './adapters';

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardIds,
} = cardsAdapter.getSelectors<RootState>((state) => state.cards.cards);

export const {
    selectAll: selectAllMetaCards,
    selectById: selectMetaCardById,
    selectIds: selectMetaCardIds,
} = metaCardsAdapter.getSelectors<RootState>((state) => state.cards.metaCards);

/** We are using createSelector since it memonizes the selector */
export const selectCardsByOwner = createSelector(
    [selectAllCards, (_state: RootState, ownerId: string | undefined) => ownerId],
    (cards, ownerId) => cards.filter((card) => ownerId && card.user?._id === ownerId),
);

export const selectCardsByIds = createSelector(
    [selectAllCards, (_state: RootState, cardIds: string[]) => cardIds],
    (cards, cardIds) => cards.filter((card) => cardIds.includes(card._id)),
);

export const selectMetaCardsByIds = createSelector(
    [selectAllMetaCards, (_state: RootState, metaCardIds: string[]) => metaCardIds],
    (metaCards, metaCardIds) => metaCards.filter((metaCard) => metaCardIds.includes(metaCard._id)),
);

export const selectOwnedMetaCardIds = createSelector([selectAllMetaCards], (metaCards) =>
    metaCards.filter(({ userSpecificFields: { owned } }) => owned).map(({ _id }) => _id),
);

export const selectCardIdsByMetaCardIds = createSelector(
    [selectAllCards, (_state: RootState, metaCardIds: string[]) => metaCardIds],
    (cards, metaCardIds) => cards.filter((card) => metaCardIds.includes(card.metaCard._id)).map((card) => card._id),
);

export const selectOwnedCardIdsOnSaleByMetaCardIds = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardIds: string[]) => metaCardIds,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardIds, userId) =>
        cards
            .filter((card) => card.onSale && card.user?._id === userId && metaCardIds.includes(card.metaCard._id))
            .map((card) => card._id),
);

export const selectAllCardsOnSale = createSelector([selectAllCards], (cards) =>
    cards.filter((card) => Boolean(card.onSale)),
);

export const selectCardsOnSaleWithLimit = createSelector(
    [selectAllCards, (_state: RootState, limit: number) => limit],
    (cards, limit) => cards.filter((card) => card.onSale).slice(0, limit),
);

export const selectCardsOnSale = createSelector(
    [selectAllCards, (_state: RootState, metaCardId: string) => metaCardId],
    (cards, metaCardId) => cards.filter((card) => card.metaCard._id === metaCardId && card.onSale),
);

export const selectCardsOnSaleByMetaCardIds = createSelector(
    [selectAllCards, (_state: RootState, metaCardIds: string[]) => metaCardIds],
    (cards, metaCardIds) => cards.filter((card) => card.onSale && metaCardIds.includes(card.metaCard._id)),
);

export const selectCardIdsOwnedNotOnSale = createSelector(
    [selectAllCards, (state: RootState) => state.userData.me?._id],
    (cards, userId) => cards.filter((card) => card.user._id === userId && !card.onSale),
);

export const selectAllMetaCardIdsOnSale = createSelector([selectAllCards], (cards) =>
    cards.filter((card) => card.onSale).map((card) => card.metaCard._id),
);

export const selectNotOwnedMetaCardIdsOnSale = createSelector(
    [selectAllCards, (state: RootState) => state.userData.me?._id],
    (cards, userId) =>
        cards.filter((card) => card.onSale && card.user?._id !== userId && userId).map((card) => card.metaCard._id),
);

export const selectMetaCardIdsByCardIds = createSelector(
    [selectAllCards, (_state: RootState, cardIds: string[]) => cardIds],
    (cards, cardIds) => cards.filter((card) => cardIds.includes(card._id)).map((card) => card.metaCard._id),
);

export const selectMetaCardsByEdition = createSelector(
    [selectAllMetaCards, (_state: RootState, edition: string) => edition],
    (metaCards, edition) => metaCards.filter((metaCard) => metaCard.edition === edition),
);

export const selectAllMetaCardIds = createSelector([selectAllMetaCards], (metaCards) =>
    metaCards.map((metaCard) => metaCard._id),
);

export const selectOwnedCards = createSelector(
    [selectAllCards, (state: RootState) => state.userData.me?._id],
    (cards, userId) => cards.filter((card) => card.user._id === userId),
);

export const selectOwnedCardIdsByMetaCardId = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardId: string) => metaCardId,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardId, userId) =>
        cards.filter((card) => metaCardId === card.metaCard._id && card.user?._id === userId).map((card) => card._id),
);
export const selectOwnedCardIdsByMetaCardIds = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardIds: string[]) => metaCardIds,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardIds, userId) =>
        cards
            .filter((card) => metaCardIds.includes(card.metaCard._id) && card.user?._id === userId)
            .map((card) => card._id),
);

export const selectOwnedCardsByMetaCardId = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardId: string) => metaCardId,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardId, userId) =>
        cards.filter((card) => card.metaCard._id === metaCardId && card.user?._id === userId),
);
export const selectCardsOwnedNotOnSaleByMetaCardId = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardId: string) => metaCardId,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardId, userId) =>
        cards.filter((card) => !card.onSale && card.metaCard._id === metaCardId && card.user?._id === userId),
);

export const selectOwnedMetaCardsByMetaCardIds = createSelector(
    [
        selectAllCards,
        (_state: RootState, metaCardIds: string[]) => metaCardIds,
        (state: RootState) => state.userData.me?._id,
    ],
    (cards, metaCardIds, userId) =>
        metaCardIds.filter((metaCardId) =>
            cards.some((card) => card.metaCard._id === metaCardId && card.user._id === userId),
        ),
);

export const selectMetaCardIdsOnSaleByOwner = createSelector([selectCardsByOwner], (ownedCards) => [
    ...new Set(ownedCards.filter((card) => card.onSale).map((card) => card.metaCard._id)),
]);

export const selectMetaCardIdsNotOnSaleByOwner = createSelector([selectCardsByOwner], (ownedCards) => [
    ...new Set(ownedCards.filter((card) => !card.onSale).map((card) => card.metaCard._id)),
]);

export const selectMetaCardsByZoneId = createSelector(
    [selectAllMetaCards, (_state: RootState, zoneId: string | undefined) => zoneId],
    (metaCards, zoneId) => metaCards.filter(({ zones }) => zones.some(({ _id }) => _id === zoneId)),
);

export const selectMetaCardEditionsByZone = createSelector([selectMetaCardsByZoneId], (metaCards) =>
    Array.from(new Set(metaCards.map(({ edition }) => edition))),
);

export const selectCardEditionsFromMetaCardIds = createSelector([selectMetaCardsByIds], (metaCards) =>
    Array.from(new Set(metaCards.map(({ edition }) => edition))),
);

export const selectMetaCardIdsByEdition = createSelector(
    [selectAllMetaCards, (_state: RootState, edition: string) => edition],
    (metaCards, edition) => metaCards.filter(({ edition: e }) => edition === e).map(({ _id }) => _id),
);
