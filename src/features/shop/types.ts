import type { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

export interface IShopItem {
    _id: string;
    _metaPack_id?: string;
    description: string;
    name: string;
    price: number;
    value?: number;
    type: 'PACK' | 'TOKEN';
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IShopItemsState = IBaseState;

export type IShopSliceState = {
    shopItems: IShopItemsState & EntityState<IShopItem>;
};

export enum SHOP_SEGMENT {
    PACKS = 'packs',
    TOKENS = 'tokens',
}
