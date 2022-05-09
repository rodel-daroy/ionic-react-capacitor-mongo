import type { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

export interface IMetaAchievement {
    _id: string;
    meta: {
        timeframe: 'ONE_OFF' | 'DAILY' | 'WEEKLY';
        group: string;
        visualisation: string;
    };
    type: 'MILESTONE' | 'STREAK';
    rewards: Array<{ type: string; value: string; description: string }>;
    category: string;
    _translations_id: { items: Array<{ id: string; value: string; language: string }> };
}
export interface IAchievement extends IMetaAchievement {
    date?: string;
    completed: boolean;
    seen: boolean;
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IAchievementsState = IBaseState;

export type IAchievementsSliceState = IAchievementsState & EntityState<IAchievement>;
