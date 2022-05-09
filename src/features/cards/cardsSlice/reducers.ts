import { Update } from '@reduxjs/toolkit';
import {
    fetchCardById,
    fetchCardsByIds,
    fetchCardsByOwner,
    fetchCardsOnSale,
    fetchOwnedCardsByMetaCardIds,
    fetchMetaCards,
    fetchMetaCardById,
    fetchMetaCardsByZoneId,
    listCardsOnMarket,
    updateCard,
    withdrawCardFromMarket,
    fetchCardsOnSaleByMetaCardId,
} from 'src/features/cards/cardsSlice/thunks';
import { cardsAdapter, metaCardsAdapter } from 'src/features/cards/cardsSlice/adapters';
import { createReducers, ExtraReducers, STATUS } from 'src/utility';
import { ICardsSliceState, IMetaCard } from '../types';

export const reducers = createReducers<ICardsSliceState>()({
    updateMetaCard(state, action: { payload: Update<IMetaCard> }) {
        metaCardsAdapter.updateOne(state.metaCards, action.payload);
    },
});

export const extraReducers: ExtraReducers<ICardsSliceState> = (builder) => {
    builder
        .addCase(fetchCardById.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchCardById.fulfilled, (state, action) => {
            cardsAdapter.upsertOne(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchCardById.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchCardsByIds.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchCardsByIds.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchCardsByIds.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchCardsByOwner.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchCardsByOwner.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchCardsByOwner.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchCardsOnSale.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchCardsOnSale.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchCardsOnSale.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchOwnedCardsByMetaCardIds.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchOwnedCardsByMetaCardIds.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchOwnedCardsByMetaCardIds.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchMetaCards.pending, (state, _action) => {
            state.metaCards.status = STATUS.LOADING;
        })
        .addCase(fetchMetaCards.fulfilled, (state, action) => {
            metaCardsAdapter.upsertMany(state.metaCards, action.payload);
            state.metaCards.status = STATUS.IDLE;
        })
        .addCase(fetchMetaCards.rejected, (state, action) => {
            state.metaCards.error = action.error;
            state.metaCards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchMetaCardById.pending, (state, _action) => {
            state.metaCards.status = STATUS.LOADING;
        })
        .addCase(fetchMetaCardById.fulfilled, (state, action) => {
            metaCardsAdapter.upsertOne(state.metaCards, action.payload);
            state.metaCards.status = STATUS.IDLE;
        })
        .addCase(fetchMetaCardById.rejected, (state, action) => {
            state.metaCards.error = action.error;
            state.metaCards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchCardsOnSaleByMetaCardId.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(fetchCardsOnSaleByMetaCardId.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            state.cards.status = STATUS.IDLE;
        })
        .addCase(fetchCardsOnSaleByMetaCardId.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(fetchMetaCardsByZoneId.pending, (state, _action) => {
            state.metaCards.status = STATUS.LOADING;
        })
        .addCase(fetchMetaCardsByZoneId.fulfilled, (state, action) => {
            metaCardsAdapter.upsertMany(state.metaCards, action.payload);
            state.metaCards.status = STATUS.IDLE;
        })
        .addCase(fetchMetaCardsByZoneId.rejected, (state, action) => {
            state.metaCards.error = action.error;
            state.metaCards.status = STATUS.FAILED;
        });

    builder
        .addCase(updateCard.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(updateCard.fulfilled, (state, _action) => {
            state.cards.status = STATUS.IDLE;
        })
        .addCase(updateCard.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(listCardsOnMarket.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(listCardsOnMarket.fulfilled, (state, action) => {
            cardsAdapter.upsertMany(state.cards, action.payload);
            const metaCardUpdates: Update<IMetaCard>[] = action.payload.map(({ metaCard }) => ({
                id: metaCard._id,
                changes: { userSpecificFields: { ...metaCard.userSpecificFields, onSaleByMe: true } },
            }));
            metaCardsAdapter.updateMany(state.metaCards, metaCardUpdates);
            state.cards.status = STATUS.SUCCESSFUL;
        })
        .addCase(listCardsOnMarket.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });

    builder
        .addCase(withdrawCardFromMarket.pending, (state, _action) => {
            state.cards.status = STATUS.LOADING;
        })
        .addCase(withdrawCardFromMarket.fulfilled, (state, action) => {
            state.cards.status = STATUS.SUCCESSFUL;
            if (!action.payload) return;
            metaCardsAdapter.updateOne(state.metaCards, {
                id: action.payload.metaCard._id,
                changes: { userSpecificFields: { ...action.payload.metaCard.userSpecificFields, onSaleByMe: false } },
            });
            cardsAdapter.upsertOne(state.cards, action.payload);
        })
        .addCase(withdrawCardFromMarket.rejected, (state, action) => {
            state.cards.error = action.error;
            state.cards.status = STATUS.FAILED;
        });
};
