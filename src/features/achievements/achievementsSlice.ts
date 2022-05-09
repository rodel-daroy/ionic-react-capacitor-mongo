import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkExtra } from 'src/boot/types';
import { STATUS } from 'src/utility';
import { ACHIEVEMENT_STATUS } from '../userData/types';
import { IAchievement, IAchievementsState, IAchievementsSliceState } from './types';

/**
 * **************
 *    ENTITIES
 * **************
 * We are using the createEntityAdapter since it provides us with pre-built functionality
 */
const achievementsAdapter = createEntityAdapter<IAchievement>({
    selectId: (e) => e._id,
    sortComparer: (a, b) => Number(b.completed) - Number(a.completed),
});

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IAchievementsSliceState = achievementsAdapter.getInitialState<IAchievementsState>({
    status: STATUS.IDLE,
    error: null,
});

/**
 * **************
 *     THUNKS
 * **************
 */

export const fetchAllAchievements = createAsyncThunk<IAchievement[], void, { state: RootState; extra: ThunkExtra }>(
    'achievements/fetchAllAchievements',
    async (_, { getState, extra: { api } }) => {
        const state = getState();
        const userAchievements = state.userData.me?.achievements;
        const res = await api.achievements.fetchAllAchievements();
        const startToday = new Date().setUTCHours(0, 0, 0, 0);
        const startWeek = new Date(startToday).valueOf() - 1000 * 60 * 60 * 24;

        return res.data.metaAchievements.map((metaAchievement) => {
            const userAchievement = userAchievements?.find((a) => {
                /* Daily & Weekly achievements are only valid if they were completed within the timeframe */
                if (metaAchievement.meta.timeframe === 'ONE_OFF') return a._id === metaAchievement._id;
                if (metaAchievement.meta.timeframe === 'DAILY')
                    return a._id === metaAchievement._id && new Date(a.achievementDate).valueOf() > startToday;
                if (metaAchievement.meta.timeframe === 'WEEKLY')
                    return a._id === metaAchievement._id && new Date(a.achievementDate).valueOf() > startWeek;
                return false;
            });

            return {
                ...metaAchievement,
                date: userAchievement && userAchievement.achievementDate,
                completed: !!userAchievement,
                seen: userAchievement?.status === ACHIEVEMENT_STATUS.SEEN,
            };
        });
    },
);

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        // Example
        someAchievementsEvent: {
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
            .addCase(fetchAllAchievements.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchAllAchievements.fulfilled, (state, action) => {
                achievementsAdapter.upsertMany(state, action.payload);
                state.status = STATUS.IDLE;
            })
            .addCase(fetchAllAchievements.rejected, (state, action) => {
                state.error = action.error;
                state.status = STATUS.FAILED;
            });
    },
});

export const achievementsReducer = achievementsSlice.reducer;

/**
 * **************
 *    Selectors
 * **************
 */

export const {
    selectAll: selectAllAchievements,
    selectById: selectAchievementById,
    selectIds: selectAchievementIds,
} = achievementsAdapter.getSelectors<RootState>((state) => state.achievements);

export const selectAchievementsByIds = createSelector(
    [selectAllAchievements, (_state: RootState, achievementIds: string[]) => achievementIds],
    (achievements, achievementIds) => achievements.filter((achievement) => achievementIds.includes(achievement._id)),
);
export const selectCompletedAchievementsByIds = createSelector(
    [selectAllAchievements, (_state: RootState, achievementIds: string[]) => achievementIds],
    (achievements, achievementIds) =>
        achievements.filter((achievement) => achievement.completed && achievementIds.includes(achievement._id)),
);

export const selectAllAchievementCategories = createSelector([selectAllAchievements], (achievements) =>
    new Set(achievements.map((achievement) => achievement.category)).values(),
);

export const selectCompletedAchievementCategories = createSelector([selectAllAchievements], (achievements) =>
    Array.from(new Set(achievements.map(({ category }) => category))).filter(
        (category) => !achievements.some(({ category: cat, completed }) => cat === category && !completed),
    ),
);

export const selectPendingAchievementCategories = createSelector([selectAllAchievements], (achievements) =>
    Array.from(new Set(achievements.map((achievement) => achievement.category))).filter(
        (category) => !achievements.filter(({ category: cat }) => cat === category).every(({ completed }) => completed),
    ),
);

export const selectAchievementIdsByCategory = createSelector(
    [selectAllAchievements, (_state: RootState, category: string) => category],
    (achievements, category) =>
        achievements.filter((achievement) => achievement.category === category).map((achievement) => achievement._id),
);

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { someAchievementsEvent } = achievementsSlice.actions;
