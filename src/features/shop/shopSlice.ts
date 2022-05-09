import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import { fetchPacksByOwner } from '../packs/packsSlice';
import { refreshUserData } from '../userData/userDataSlice';
import { IShopItem, IShopItemsState, IShopSliceState } from './types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const shopItemsAdapter = createEntityAdapter<IShopItem>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IShopSliceState = {
    shopItems: shopItemsAdapter.getInitialState<IShopItemsState>({
        status: STATUS.IDLE,
        error: null,
    }),
};

/**
 * **************
 *     THUNKS
 * **************
 */

/** ShopItems contain full item-data */
export const fetchShopItemById = createAsyncThunk<IShopItem, string, { extra: ThunkExtra }>(
    'shop/fetchShopItemById',
    async (shopItemId, { extra: { api } }) => {
        const res = await api.shop.fetchShopItemById({ shopItemId });
        return res.data.shopItem;
    },
);

/** ShopItems contain full item-data */
export const fetchShopItemsByIds = createAsyncThunk<IShopItem[], string[], { extra: ThunkExtra }>(
    'shop/fetchShopItemsByIds',
    async (shopItemIds, { extra: { api } }) => {
        const res = await api.shop.fetchShopItemsByIds({ shopItemIds });
        return res.data.shopItems;
    },
);

/** ShopItems contain full item-data */
export const fetchAllShopItems = createAsyncThunk<IShopItem[], void, { extra: ThunkExtra }>(
    'shop/fetchAllShopItems',
    async (_, { extra: { api } }) => {
        const res = await api.shop.fetchAllShopItems();
        return res.data.shopItems;
    },
);

/** Implement Realm-Functions */
export const buyShopItem = createAsyncThunk<
    void,
    { id: string; numItems: number; paymentMethod: string },
    { state: RootState; extra: ThunkExtra }
>('shop/buyShopItem', async ({ id, numItems, paymentMethod }, { getState, dispatch, extra: { realm } }) => {
    const state = getState();
    const user = state.userData.me;
    if (!user) return;
    await realm.currentUser?.functions['buyShopItem']({ id, numItems, paymentMethod });
    void dispatch(refreshUserData(user.accountId));
    void dispatch(fetchPacksByOwner(user._id));
});

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        // Example
        someShopEvent: {
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
            .addCase(fetchShopItemById.pending, (state, _action) => {
                state.shopItems.status = STATUS.LOADING;
            })
            .addCase(fetchShopItemById.fulfilled, (state, action) => {
                shopItemsAdapter.upsertOne(state.shopItems, action.payload);
                state.shopItems.status = STATUS.IDLE;
            })
            .addCase(fetchShopItemById.rejected, (state, action) => {
                state.shopItems.error = action.error;
                state.shopItems.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchShopItemsByIds.pending, (state, _action) => {
                state.shopItems.status = STATUS.LOADING;
            })
            .addCase(fetchShopItemsByIds.fulfilled, (state, action) => {
                shopItemsAdapter.upsertMany(state.shopItems, action.payload);
                state.shopItems.status = STATUS.IDLE;
            })
            .addCase(fetchShopItemsByIds.rejected, (state, action) => {
                state.shopItems.error = action.error;
                state.shopItems.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchAllShopItems.pending, (state, _action) => {
                state.shopItems.status = STATUS.LOADING;
            })
            .addCase(fetchAllShopItems.fulfilled, (state, action) => {
                shopItemsAdapter.upsertMany(state.shopItems, action.payload);
                state.shopItems.status = STATUS.IDLE;
            })
            .addCase(fetchAllShopItems.rejected, (state, action) => {
                state.shopItems.error = action.error;
                state.shopItems.status = STATUS.FAILED;
            });
    },
});

export const shopReducer = shopSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllShopItems,
    selectById: selectShopItemById,
    selectIds: selectShopItemIds,
} = shopItemsAdapter.getSelectors<RootState>((state) => state.shop.shopItems);

/** We are using createSelector since it memonizes the selector */
export const selectShopItemsByType = createSelector(
    [selectAllShopItems, (_state: RootState, type: 'TOKEN' | 'PACK' | undefined) => type],
    (shopItems, type) => (type ? shopItems.filter((shopItem) => shopItem.type === type) : []),
);

/** We are using createSelector since it memonizes the selector */
export const selectShopItemsByPrice = createSelector(
    [
        selectAllShopItems,
        (_state: RootState, price: { min?: number; max?: number }, type?: 'PACK' | 'TOKEN') => ({
            price,
            type,
        }),
    ],
    (shopItems, { type, price }) =>
        shopItems
            .filter((shopItem) => (type ? shopItem.type === type : true))
            .filter((shopItem) => {
                let includeItem = true;
                if (price.min) {
                    includeItem = shopItem.price >= price.min;
                }
                if (price.max) {
                    includeItem = shopItem.price <= price.max;
                }
                return includeItem;
            }),
);

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { someShopEvent } = shopSlice.actions;
