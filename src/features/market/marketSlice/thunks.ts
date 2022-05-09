import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { ThunkExtra } from 'src/boot/types';
import { fetchCardById } from 'src/features/cards/cardsSlice/thunks';
import { refreshUserData } from 'src/features/userData/userDataSlice';
import { updateMetaCard } from 'src/features/cards/cardsSlice/slice';

/**
 * **************
 *     THUNKS
 * **************
 */
export const purchaseCardFromMarket = createAsyncThunk<
    void,
    { cardId: string; paymentMethod: 'igc' },
    { extra: ThunkExtra }
>('market/purchaseCardFromMarket', async ({ cardId, paymentMethod }, { dispatch, extra: { realm } }) => {
    await realm.currentUser?.callFunction('purchaseCardFromMarket', { cardId, paymentMethod });
    void dispatch(refreshUserData());
    void dispatch(fetchCardById(cardId))
        .then(unwrapResult)
        .then((card) => {
            dispatch(
                updateMetaCard({
                    id: card.metaCard._id,
                    changes: { userSpecificFields: { ...card.metaCard.userSpecificFields, owned: true } },
                }),
            );
        });
});
