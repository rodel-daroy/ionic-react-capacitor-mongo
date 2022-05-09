import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import {
    INotification,
    INotificationQueryInput,
    INotificationsSliceState,
    INotificationsState,
    INotificationUpdateInput,
    NOTIFICATION_STATUS,
} from './types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const notificationsAdapter = createEntityAdapter<INotification>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: INotificationsSliceState = {
    status: STATUS.IDLE,
    error: null,
    notifications: notificationsAdapter.getInitialState<INotificationsState>({
        status: STATUS.IDLE,
        error: null,
    }),
};

/**
 * **************
 *     THUNKS
 * **************
 */

export const fetchNotifications = createAsyncThunk<INotification[], void, { state: RootState; extra: ThunkExtra }>(
    'notifications/fetchNotifications',
    async (_, { getState, extra: { api } }) => {
        const state = getState();
        const userId = state.userData.me?._id;
        if (!userId) throw new Error('fetchNotifications requires authenticated User.');
        const res = await api.notifications.fetchNotifications({ userId }, { fetchPolicy: 'network-only' });
        return res.data.notifications;
    },
);

export const fetchUnreadNotifications = createAsyncThunk<
    INotification[],
    void,
    { state: RootState; extra: ThunkExtra }
>('notifications/fetchUnreadNotifications', async (_, { getState, extra: { api } }) => {
    const state = getState();
    const userId = state.userData.me!._id;
    const res = await api.notifications.fetchUnreadNotifications({ userId }, { fetchPolicy: 'network-only' });
    return res.data.notifications;
});

export const updateNotifications = createAsyncThunk<
    { matchedCount: number; modifiedCount: number } | void | null,
    { query: INotificationQueryInput; updates: INotificationUpdateInput },
    { state: RootState; extra: ThunkExtra }
>('notifications/updateNotifications', async ({ query, updates }, { extra: { api } }) => {
    const res = await api.notifications.updateNotifications(query, { updates });
    return res.data;
});

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        // Example
        someNotificationEvent: {
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
            .addCase(fetchNotifications.pending, (state, _action) => {
                state.notifications.status = STATUS.LOADING;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                notificationsAdapter.upsertMany(state.notifications, action.payload);
                state.notifications.status = STATUS.IDLE;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.notifications.error = action.error;
                state.notifications.status = STATUS.FAILED;
            });
    },
});

export const notificationsReducer = notificationsSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllNotifications,
    selectById: selectNotificationById,
    selectIds: selectNotificationIds,
} = notificationsAdapter.getSelectors<RootState>((state) => state.notifications.notifications);

export const selectHasUnreadNotifications = createSelector([selectAllNotifications], (notifications) =>
    notifications.some((notifications) => notifications.status === NOTIFICATION_STATUS.NOT_READ),
);

export const selectNotificationIdsUnread = createSelector([selectAllNotifications], (notifications) =>
    notifications.filter(({ status }) => status === NOTIFICATION_STATUS.NOT_READ).map(({ _id }) => _id),
);
export const selectNotificationsRead = createSelector([selectAllNotifications], (notifications) =>
    notifications.filter(({ status }) => status === NOTIFICATION_STATUS.READ),
);

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { someNotificationEvent } = notificationsSlice.actions;
