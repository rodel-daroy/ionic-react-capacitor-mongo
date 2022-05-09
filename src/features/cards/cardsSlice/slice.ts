import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';
import { ICardsSliceState, ICardsState, IMetaCardsState } from '../types';
import { cardsAdapter, metaCardsAdapter } from './adapters';
import { reducers, extraReducers } from './reducers';

/**
 * **************
 *     STATE
 * **************
 */
const initialState: ICardsSliceState = {
    cards: cardsAdapter.getInitialState<ICardsState>({
        status: STATUS.IDLE,
        error: null,
    }),
    metaCards: metaCardsAdapter.getInitialState<IMetaCardsState>({
        status: STATUS.IDLE,
        error: null,
    }),
};

/**
 * **********************
 *    REDUCERS (SLICE)
 * **********************
 */
const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers,
    extraReducers,
});

export const cardsReducer = cardsSlice.reducer;

/**
 * ************
 *   ACTIONS
 * ************
 */

export const { updateMetaCard } = cardsSlice.actions;
