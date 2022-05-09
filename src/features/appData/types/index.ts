import { EntityState, SerializedError } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';
export * from './Zone';

export interface IPartialZone {
    _id: string;
    name: string;
    rank: number;
    description: string;
    location: string;
    insigniaImageUrl: string;
    zoneMetaCardCount: {
        total: number;
        owned: number;
    };
}
export interface IZone extends IPartialZone {
    _ancestor_ids: IPartialZone[];
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IZonesState = IBaseState & {
    currentZone: IZone | null;
    initialized: boolean;
};

export type IAppDataSliceState = IZonesState & EntityState<IZone>;
