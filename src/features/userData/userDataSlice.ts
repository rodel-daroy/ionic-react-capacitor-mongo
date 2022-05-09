import { createAsyncThunk, createEntityAdapter, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Credentials } from 'realm-web';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import { selectMetaCardById } from '../cards/cardsSlice/selectors';
import { updateMetaCard } from '../cards/cardsSlice/slice';
import { IUser, IUserData, IUserDataSliceState, IUsersState } from './types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const usersAdapter = createEntityAdapter<IUser>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => a.username.localeCompare(b.username),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IUserDataSliceState = {
    me: null,
    status: STATUS.IDLE,
    error: null,
    users: usersAdapter.getInitialState<IUsersState>({
        status: STATUS.IDLE,
        error: null,
    }),
};

/**
 * **************
 *     THUNKS
 * **************
 */

/** Users contain only public user-data */
export const fetchUserById = createAsyncThunk<IUser, string, { extra: ThunkExtra }>(
    'userData/fetchUserById',
    async (userId, { extra: { api } }) => {
        const res = await api.userData.fetchUserById({ userId });
        return res.data.user;
    },
);

/** Users contain only public user-data */
export const fetchUsersByIds = createAsyncThunk<IUser[], string[], { extra: ThunkExtra }>(
    'userData/fetchUsersByIds',
    async (userIds, { extra: { api } }) => {
        const res = await api.userData.fetchUsersByIds({ userIds });
        return res.data.users;
    },
);

/** UserData contains full user-data, incl. private information */
export const refreshUserData = createAsyncThunk<IUserData | void, string | void, { extra: ThunkExtra }>(
    'userData/refreshUserData',
    async (accountId, { extra: { realm, api } }) => {
        const id = accountId || realm.currentUser?.id;
        if (!id) return;
        const res = await api.userData.fetchUserDataByAccountId({ accountId: id });
        return res.data.user;
    },
);

/** Assigning updates to realm.currentUser.customData will propagate to the server */
export const updateUserData = createAsyncThunk<void, Partial<IUserData>, { state: RootState; extra: ThunkExtra }>(
    'userData/updateUserData',
    async (updates, { getState, dispatch, extra: { api } }) => {
        const userData = getState().userData.me;
        if (!userData) throw new Error('Failed to updateUserData: No currentUser.');
        await api.userData.updateUserData({ _id: userData._id }, { updates });
        void dispatch(refreshUserData(userData.accountId));
    },
);

/** Adds a card to user.bookmarkedCards */
export const addBookmarkedCard = createAsyncThunk<IUserData, string, { state: RootState; extra: ThunkExtra }>(
    'userData/addBookmarkedCard',
    async (metaCardId, { getState, dispatch }) => {
        const state = getState();
        const userData = state.userData.me;
        const metaCard = selectMetaCardById(state, metaCardId);
        if (!userData || !metaCard) throw new Error('Failed to addBookmarkedCard: No currentUser or metaCard.');

        const bookmarks = userData._bookmarkedCard_ids || [];
        const bookmarkedCards = Array.from(new Set([...bookmarks, metaCardId]));
        dispatch(
            updateMetaCard({
                id: metaCardId,
                changes: { userSpecificFields: { ...metaCard.userSpecificFields, bookmarked: true } },
            }),
        );
        return dispatch(updateUserData({ _bookmarkedCard_ids: bookmarkedCards }))
            .then(unwrapResult)
            .catch((e) => {
                // Update failed, revert local change;
                dispatch(
                    updateMetaCard({
                        id: metaCardId,
                        changes: { userSpecificFields: { ...metaCard.userSpecificFields, bookmarked: false } },
                    }),
                );
                return e;
            });
    },
);

/** Removes a card from user.bookmarkedCards */
export const removeBookmarkedCard = createAsyncThunk<IUserData, string, { state: RootState; extra: ThunkExtra }>(
    'userData/removeBookmarkedCard',
    async (metaCardId, { getState, dispatch }) => {
        const state = getState();
        const userData = state.userData.me;
        const metaCard = selectMetaCardById(state, metaCardId);
        if (!userData || !metaCard) throw new Error('Failed to addBookmarkedCard: No currentUser or metaCard.');

        const bookmarks = userData._bookmarkedCard_ids || [];
        const bookmarkedCards = bookmarks.filter((id) => id !== metaCardId);
        dispatch(
            updateMetaCard({
                id: metaCardId,
                changes: { userSpecificFields: { ...metaCard.userSpecificFields, bookmarked: false } },
            }),
        );
        return dispatch(updateUserData({ _bookmarkedCard_ids: bookmarkedCards }))
            .then(unwrapResult)
            .catch((e) => {
                // Update failed, revert local change;
                dispatch(
                    updateMetaCard({
                        id: metaCardId,
                        changes: { userSpecificFields: { ...metaCard.userSpecificFields, bookmarked: true } },
                    }),
                );
                return e;
            });
    },
);

/** Login User and set local UserData */
export const logInUser = createAsyncThunk<IUserData, Credentials<any>, { extra: ThunkExtra }>(
    'userData/logInUser',
    async (credentials, { extra: { realm } }) => {
        const user = await realm.logIn(credentials);
        return user.customData;
    },
);

/** Delete Access+Refresh Token and clears local UserData */
export const logOutUser = createAsyncThunk<void, void, { extra: ThunkExtra }>(
    'userData/logOutUser',
    async (_, { extra: { realm } }) => {
        if (!realm.currentUser) throw new Error('Failed to logOutUser: No currentUser.');
        await realm.currentUser.logOut();
        window.location = '/login' as any;
    },
);

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        // Example
        anyEvent: {
            reducer(_state, _action) {
                // some mutation
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
            .addCase(fetchUserById.pending, (state, _action) => {
                state.users.status = STATUS.LOADING;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                usersAdapter.upsertOne(state.users, action.payload);
                state.users.status = STATUS.IDLE;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.users.error = action.error;
                state.users.status = STATUS.FAILED;
            });

        builder
            .addCase(fetchUsersByIds.pending, (state, _action) => {
                state.users.status = STATUS.LOADING;
            })
            .addCase(fetchUsersByIds.fulfilled, (state, action) => {
                usersAdapter.upsertMany(state.users, action.payload);
                state.users.status = STATUS.IDLE;
            })
            .addCase(fetchUsersByIds.rejected, (state, action) => {
                state.users.error = action.error;
                state.users.status = STATUS.FAILED;
            });

        builder
            .addCase(refreshUserData.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(refreshUserData.fulfilled, (state, action) => {
                if (action.payload) state.me = action.payload;
                state.status = STATUS.IDLE;
            })
            .addCase(refreshUserData.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });

        builder
            .addCase(updateUserData.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(updateUserData.fulfilled, (state, _action) => {
                state.status = STATUS.IDLE;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });

        builder
            .addCase(logInUser.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(logInUser.fulfilled, (state, _action) => {
                state.status = STATUS.IDLE;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });

        builder
            .addCase(logOutUser.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(logOutUser.fulfilled, (state, _action) => {
                state.me = null;
                state.status = STATUS.IDLE;
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });
    },
});

export const userDataReducer = userDataSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllUsersItems,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors<RootState>((state) => state.userData.users);

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { anyEvent } = userDataSlice.actions;
