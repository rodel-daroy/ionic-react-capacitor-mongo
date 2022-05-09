import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import { IZone, IAppDataSliceState, IZonesState } from './types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const zonesAdapter = createEntityAdapter<IZone>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => Number(b.name) - Number(a.name),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IAppDataSliceState = zonesAdapter.getInitialState<IZonesState>({
    status: STATUS.IDLE,
    error: null,
    currentZone: null,
    initialized: false,
});

/**
 * **************
 *     THUNKS
 * **************
 */

export const fetchZones = createAsyncThunk<IZone[], void, { extra: ThunkExtra }>(
    'appData/fetchZones',
    async (_, { extra: { api } }) => {
        const res = await api.appData.fetchZones();
        return res.data.zones;
    },
);

export const callFunction = createAsyncThunk<void, { name: string; args?: any }, { extra: ThunkExtra }>(
    'appData/callFunction',
    async ({ name, args }, { extra: { realm } }) => realm.currentUser?.callFunction(name, args),
);
/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const appDataSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setCurrentZone(state, { payload }: { payload: string | null }) {
            if (payload === null) state.currentZone = null;
            else {
                const zone = zonesAdapter.getSelectors().selectById(state, payload) ?? null;
                state.currentZone = zone;
            }
            state.initialized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchZones.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchZones.fulfilled, (state, action) => {
                zonesAdapter.upsertMany(state, action.payload);
                state.status = STATUS.SUCCESSFUL;
            })
            .addCase(fetchZones.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });
    },
});

export const appDataReducer = appDataSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllZones,
    selectById: selectZoneById,
    selectIds: selectZoneIds,
} = zonesAdapter.getSelectors<RootState>((state) => state.appData);

export const selectCurrentZone = createSelector([(state: RootState) => state.appData.currentZone], (zone) => zone);

export const selectRootZoneIds = createSelector([selectAllZones], (zones) =>
    zones.filter(({ rank }) => rank === 0).map(({ _id }) => _id),
);

export const selectRootZoneIdsBySearchText = createSelector(
    [selectAllZones, (_state: RootState, searchText: string) => searchText],
    (zones, searchText) =>
        zones
            .filter(({ rank }) => rank === 0)
            .filter(({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
            .map(({ _id }) => _id),
);

export const selectChildZoneIds = createSelector(
    [selectAllZones, (_state: RootState, parentZoneId: string) => parentZoneId],
    (zones, zoneId) =>
        zones.filter(({ _ancestor_ids }) => _ancestor_ids.some(({ _id }) => _id === zoneId)).map(({ _id }) => _id),
);

export const selectChildZonesBySearchText = createSelector(
    [selectAllZones, (_state: RootState, parentZoneId: string, searchText: string) => ({ parentZoneId, searchText })],
    (zones, { parentZoneId, searchText }) =>
        zones.filter(
            ({ _ancestor_ids, name }) =>
                name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 &&
                _ancestor_ids.some(({ _id }) => _id === parentZoneId),
        ),
);
/**
 * ************
 *   ACTIONS
 * ************
 */

export const { setCurrentZone } = appDataSlice.actions;
