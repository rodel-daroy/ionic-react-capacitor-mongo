import type { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

export interface IPack {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    metaPack: IMetaPack;
    opened: boolean;
    _card_ids: string[];
}

export interface IMetaPack {
    _id: string;
    cost: Array<{ currency: string; value: number }>;
    edition: string;
    imageUrl: string;
    cardsInPack: number;
    packsQty: number;
    name: string;
    type: string;
    probabilities: {
        [key: string]: number;
    };
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IPacksState = IBaseState;
export type IMetaPacksState = IBaseState;

export type IPacksSliceState = {
    packs: IPacksState & EntityState<IPack>;
    metaPacks: IMetaPacksState & EntityState<IMetaPack>;
};

export enum COLLECT_SEGMENT {
    CARDS = 'cards',
    PACKS = 'packs',
}
