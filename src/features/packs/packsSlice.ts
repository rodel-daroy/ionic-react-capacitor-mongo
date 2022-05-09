import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import { IPack, IPacksSliceState, IPacksState, IMetaPack, IMetaPacksState } from './types';
import { fetchCardsByIds, updateMetaCard } from '../cards/cardsSlice';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const packsAdapter = createEntityAdapter<IPack>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => Number(a.opened) - Number(b.opened),
});

const metaPacksAdapter = createEntityAdapter<IMetaPack>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => Number(a.edition) - Number(b.edition),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IPacksSliceState = {
    packs: packsAdapter.getInitialState<IPacksState>({
        status: STATUS.IDLE,
        error: null,
    }),
    metaPacks: metaPacksAdapter.getInitialState<IMetaPacksState>({
        status: STATUS.IDLE,
        error: null,
    }),
};

/**
 * **************
 *     THUNKS
 * **************
 */

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const fetchMetaPacks = createAsyncThunk<IMetaPack[], void, { extra: ThunkExtra }>(
    'packs/fetchMetaPacks',
    async (_, { extra: { api } }) => {
        const res = await api.packs.fetchMetaPacks();
        return res.data.metaPacks;
    },
);

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const fetchPackById = createAsyncThunk<IPack, string, { extra: ThunkExtra }>(
    'packs/fetchPackById',
    async (packId, { extra: { api } }) => {
        const res = await api.packs.fetchPackById({ packId });
        return res.data.pack;
    },
);

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const fetchPacksByIds = createAsyncThunk<IPack[], string[], { extra: ThunkExtra }>(
    'packs/fetchPacksByIds',
    async (packIds, { extra: { api } }) => {
        const res = await api.packs.fetchPacksByIds({ packIds });
        return res.data.packs;
    },
);

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const fetchPacksByOwner = createAsyncThunk<IPack[], string, { extra: ThunkExtra }>(
    'packs/fetchPacksByOwner',
    async (ownerId, { extra: { api } }) => {
        const res = await api.packs.fetchPacksByOwner({ ownerId }, { fetchPolicy: 'network-only' });
        return res.data.packs;
    },
);

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const fetchMetaPacksByEdition = createAsyncThunk<IMetaPack[], string, { extra: ThunkExtra }>(
    'packs/fetchMetaPacksByEdition',
    async (editionId, { extra: { api } }) => {
        const res = await api.packs.fetchMetaPacksByEdition({ editionId });
        return res.data.metaPacks;
    },
);

/** Packs contain full pack-data including related data to render the detailed view of a pack */
export const openPack = createAsyncThunk<string, IPack, { extra: ThunkExtra; state: RootState }>(
    'packs/openPack',
    async (pack, { extra: { realm }, getState, dispatch }) => {
        const userId = getState().userData?.me?._id;
        if (!userId) throw new Error('No user id found');
        await realm.currentUser?.callFunction('openPack', {
            packId: pack._id,
            userId,
        });
        void dispatch(fetchCardsByIds(pack._card_ids))
            .then(unwrapResult)
            .then((cards) => {
                // Set each meta-card in redux to owned: true
                cards.forEach(({ metaCard }) =>
                    dispatch(
                        updateMetaCard({
                            id: metaCard._id,
                            changes: { userSpecificFields: { ...metaCard.userSpecificFields, owned: true } },
                        }),
                    ),
                );
            });
        return pack._id;
    },
);

/** Packs contain full card-data including related data to render the detailed view of a card */
export const fetchOwnedPacksByMetaPackIds = createAsyncThunk<
    IPack[],
    { ownerId: string; metaPackIds: string[] },
    { extra: ThunkExtra }
>('packs/fetchOwnedPacksByMetaPackIds', async ({ ownerId, metaPackIds }, { extra: { api } }) => {
    const res = await api.packs.fetchOwnedPacksByMetaPackIds({ ownerId, metaPackIds });
    return res.data.packs;
});

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const packsSlice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        // Example
        somePackEvent: {
            reducer(_state, _action) {
                // mutate state
            },
            prepare() {
                // do something before calling the reducer
                return {
                    meta: undefined,
                    error: null,
                    payload: null,
                };
            },
        },
        // Example-End
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMetaPacks.pending, (state, _action) => {
                state.metaPacks.status = STATUS.LOADING;
            })
            .addCase(fetchMetaPacks.fulfilled, (state, action) => {
                metaPacksAdapter.upsertMany(state.metaPacks, action.payload);
                state.metaPacks.status = STATUS.IDLE;
            })
            .addCase(fetchMetaPacks.rejected, (state, action) => {
                state.metaPacks.error = action.error;
                state.metaPacks.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchPackById.pending, (state, _action) => {
                state.packs.status = STATUS.LOADING;
            })
            .addCase(fetchPackById.fulfilled, (state, action) => {
                packsAdapter.upsertOne(state.packs, action.payload);
                state.packs.status = STATUS.IDLE;
            })
            .addCase(fetchPackById.rejected, (state, action) => {
                state.packs.error = action.error;
                state.packs.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchPacksByIds.pending, (state, _action) => {
                state.packs.status = STATUS.LOADING;
            })
            .addCase(fetchPacksByIds.fulfilled, (state, action) => {
                packsAdapter.upsertMany(state.packs, action.payload);
                state.packs.status = STATUS.IDLE;
            })
            .addCase(fetchPacksByIds.rejected, (state, action) => {
                state.packs.error = action.error;
                state.packs.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchPacksByOwner.pending, (state, _action) => {
                state.packs.status = STATUS.LOADING;
            })
            .addCase(fetchPacksByOwner.fulfilled, (state, action) => {
                packsAdapter.upsertMany(state.packs, action.payload);
                state.packs.status = STATUS.IDLE;
            })
            .addCase(fetchPacksByOwner.rejected, (state, action) => {
                state.packs.error = action.error;
                state.packs.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchMetaPacksByEdition.pending, (state, _action) => {
                state.metaPacks.status = STATUS.LOADING;
            })
            .addCase(fetchMetaPacksByEdition.fulfilled, (state, action) => {
                metaPacksAdapter.upsertMany(state.metaPacks, action.payload);
                state.metaPacks.status = STATUS.IDLE;
            })
            .addCase(fetchMetaPacksByEdition.rejected, (state, action) => {
                state.metaPacks.error = action.error;
                state.metaPacks.status = STATUS.FAILED;
            });

        builder
            .addCase(openPack.pending, (state, _action) => {
                state.packs.status = STATUS.LOADING;
            })
            .addCase(openPack.fulfilled, (state, action) => {
                packsAdapter.removeOne(state.packs, action.payload);
                state.packs.status = STATUS.IDLE;
            })
            .addCase(openPack.rejected, (state, action) => {
                state.packs.error = action.error;
                state.packs.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchOwnedPacksByMetaPackIds.pending, (state, _action) => {
                state.packs.status = STATUS.LOADING;
            })
            .addCase(fetchOwnedPacksByMetaPackIds.fulfilled, (state, action) => {
                packsAdapter.upsertMany(state.packs, action.payload);
                state.packs.status = STATUS.IDLE;
            })
            .addCase(fetchOwnedPacksByMetaPackIds.rejected, (state, action) => {
                state.packs.error = action.error;
                state.packs.status = STATUS.FAILED;
            });
    },
});

export const packsReducer = packsSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllPacks,
    selectById: selectPackById,
    selectIds: selectPackIds,
} = packsAdapter.getSelectors<RootState>((state) => state.packs.packs);

export const {
    selectAll: selectAllMetaPacks,
    selectById: selectMetaPackById,
} = metaPacksAdapter.getSelectors<RootState>((state) => state.packs.metaPacks);

/** We are using createSelector since it memonizes the selector */
export const selectPacksByOwner = createSelector(
    [selectAllPacks, (_state: RootState, ownerId: string) => ownerId],
    (packs, ownerId) => packs.filter((pack) => pack.user._id === ownerId),
);

/** We are using createSelector since it memonizes the selector */
export const selectUnopenedPacksByOwner = createSelector(
    [selectAllPacks, (_state: RootState, ownerId: string) => ownerId],
    (packs, ownerId) => packs.filter((pack) => pack.user._id === ownerId && !pack.opened),
);

export const selectMetaPacksByEdition = createSelector(
    [selectAllMetaPacks, (_state: RootState, edition: string) => edition],
    (metaPacks, edition) => metaPacks.filter((metaPack) => metaPack.edition === edition),
);

export const selectMetaPackNames = createSelector([selectAllMetaPacks], (metaPacks) =>
    metaPacks.map((metaPack) => metaPack.name),
);

export const selectMetaPackCosts = createSelector([selectAllMetaPacks], (metaPacks) =>
    metaPacks.map((metaPack) => metaPack.cost),
);

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { somePackEvent } = packsSlice.actions;
