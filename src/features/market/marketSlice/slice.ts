import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';
import { IMarketSliceState } from '../types';
import { purchaseCardFromMarket } from './thunks';

/**
 * **************
 *     STATE
 * **************
 */
const initialState: IMarketSliceState = {
    status: STATUS.IDLE,
    error: null,
};

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        dismissMarketError(state) {
            state.error = null;
            state.status = STATUS.IDLE;
        },
        setMarketStatus(state, action: { payload: STATUS }) {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(purchaseCardFromMarket.pending, (state, _action) => {
                state.status = STATUS.LOADING;
            })
            .addCase(purchaseCardFromMarket.fulfilled, (state, _action) => {
                state.status = STATUS.SUCCESSFUL;
            })
            .addCase(purchaseCardFromMarket.rejected, (state, action) => {
                // TODO: Catch insufficient funds error
                state.error = action.error;
                state.status = STATUS.FAILED;
            });
    },
});

export const marketReducer = marketSlice.reducer;

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { dismissMarketError, setMarketStatus } = marketSlice.actions;
