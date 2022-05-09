import type { SerializedError } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IMarketItemsState = IBaseState;

export type IMarketSliceState = IBaseState;

export enum MARKET_SEGMENT {
    BUY = 'buy',
    SELL = 'sell',
}
