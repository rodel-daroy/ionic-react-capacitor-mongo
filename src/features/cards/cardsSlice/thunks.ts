import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICard } from 'src/features/cards/types';
import { ThunkExtra, RootState } from 'src/boot/types';
import { IMetaCard, IUpdateCardInput } from '../types';

/**
 * **************
 *     THUNKS
 * **************
 */

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchCardById = createAsyncThunk<ICard, string, { extra: ThunkExtra }>(
    'cards/fetchCardById',
    async (cardId, { extra: { api } }) => {
        const res = await api.cards.fetchCardById({ cardId }, { fetchPolicy: 'network-only' });
        return res.data.card;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchCardsByIds = createAsyncThunk<ICard[], string[], { extra: ThunkExtra }>(
    'cards/fetchCardsByIds',
    async (cardIds, { extra: { api } }) => {
        const res = await api.cards.fetchCardsByIds({ cardIds });
        return res.data.cards;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchCardsOnSale = createAsyncThunk<ICard[], number, { extra: ThunkExtra }>(
    'cards/fetchCardsOnSale',
    async (limit = 0, { extra: { api } }) => {
        const res = await api.cards.fetchCardsByFilter({ filter: { onSale: true, _user_id_exists: true }, limit });
        return res.data.cards;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchCardsOnSaleByMetaCardId = createAsyncThunk<ICard[], string, { extra: ThunkExtra; state: RootState }>(
    'cards/fetchCardsOnSaleByMetaCardId',
    async (metaCardId, { extra: { api }, getState }) => {
        const userId = getState().userData.me?._id;
        const res = await api.cards.fetchCardsByFilter({
            filter: { _metaCard_id: { _id: metaCardId }, onSale: true, _user_id: { _id_ne: userId } },
            limit: 0,
        });
        return res.data.cards;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchCardsByOwner = createAsyncThunk<ICard[], string, { extra: ThunkExtra }>(
    'cards/fetchCardsByOwner',
    async (ownerId, { extra: { api } }) => {
        const res = await api.cards.fetchCardsByOwner({ ownerId });
        return res.data.cards;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchMetaCards = createAsyncThunk<IMetaCard[], void, { state: RootState; extra: ThunkExtra }>(
    'cards/fetchMetaCards',
    async (_, { extra: { api } }) => {
        const { data } = await api.cards.fetchMetaCards();
        return data.metaCards;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchOwnedCardsByMetaCardIds = createAsyncThunk<
    ICard[],
    string[],
    { extra: ThunkExtra; state: RootState }
>('cards/fetchOwnedCardsByMetaCardIds', async (metaCardIds, { getState, extra: { api } }) => {
    const ownerId = getState().userData.me?._id;
    if (!ownerId) throw Error('Fetching Cards without authenticated user.');
    const res = await api.cards.fetchOwnedCardsByMetaCardIds({ ownerId, metaCardIds });
    return res.data.cards;
});

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchMetaCardById = createAsyncThunk<IMetaCard, string, { state: RootState; extra: ThunkExtra }>(
    'cards/fetchMetaCardById',
    async (metaCardId, { extra: { api } }) => {
        const { data } = await api.cards.fetchMetaCardById({ metaCardId });
        return data.metaCard;
    },
);

/** Cards contain full card-data including related data to render the detailed view of a card */
export const fetchMetaCardsByZoneId = createAsyncThunk<IMetaCard[], string, { state: RootState; extra: ThunkExtra }>(
    'cards/fetchMetaCardsByZoneId',
    async (zoneId, { extra: { api } }) => {
        const { data } = await api.cards.fetchMetaCardsByFilter(
            { filter: { _zone_ids_in: [{ _id: zoneId }] } },
            { fetchPolicy: 'network-only' },
        );
        return data.metaCards;
    },
);

export const updateCard = createAsyncThunk<void, { cardId: string; updates: IUpdateCardInput }, { extra: ThunkExtra }>(
    'cards/updateCard',
    async ({ cardId, updates }, { dispatch, extra: { api } }) => {
        // The price should be a string in the backend
        const u: IUpdateCardInput = {
            ...updates,
            price: updates.price !== undefined ? `${updates.price}` : undefined,
        };

        await api.cards.updateCard({ _id: cardId }, { updates: u });
        void dispatch(fetchCardById(cardId));
        return;
    },
);

export const listCardsOnMarket = createAsyncThunk<ICard[], { [key: string]: number }, { extra: ThunkExtra }>(
    'cards/listCardsOnMarket',
    async (cardsForSale, { extra: { api } }) => {
        const promises = Object.entries(cardsForSale).map(([cardId, price]) => {
            const updates: IUpdateCardInput = {
                price: String(price),
                onSale: true,
                onSaleDate: new Date().toISOString(),
            };
            return api.cards.updateCard({ _id: cardId }, { updates });
        });

        const result = await Promise.all(promises);

        return result.map((res) => res.data?.card).filter(Boolean) as ICard[];
    },
);

export const withdrawCardFromMarket = createAsyncThunk<ICard | void, string, { extra: ThunkExtra }>(
    'market/withdrawCardFromMarket',
    async (cardId, { extra: { api } }) => {
        const updates: IUpdateCardInput = {
            price_unset: true,
            onSale: false,
            onSaleDate_unset: true,
        };
        const res = await api.cards.updateCard({ _id: cardId }, { updates });
        return res.data?.card;
    },
);
