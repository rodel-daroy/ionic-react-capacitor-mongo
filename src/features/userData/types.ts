import type { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

export enum ACHIEVEMENT_STATUS {
    NOT_SEEN = 'NOT_SEEN',
    SEEN = 'SEEN',
}
export interface IMedia {
    profilePhoto?: string;
}

export interface IUser {
    _id: string;
    username: string;
    bio?: string;
    points: number;
    coins: number;
    media?: IMedia;
    groups: any[];
    achievements: Array<{ _id: string; achievementDate: string; status: ACHIEVEMENT_STATUS }>;
}

export interface IUserData extends IUser {
    accountId: string;
    coins: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    paymentProvider?: any;
    preferredLanguage?: string;
    securitySettings: number;
    prizes?: any[];
    statModifiers?: any;
    invites?: any[];
    vitalStats?: any[];
    zoneStats?: any[];
    _bookmarkedCard_ids?: string[];
    tutorialFinished: boolean;
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type IUsersState = IBaseState;

export type IUserDataSliceState = {
    me: IUserData | null;
    status: STATUS;
    error: Error | SerializedError | null;
    users: IUsersState & EntityState<IUser>;
};

export type IUserQueryInput = Partial<{
    _id: string;
    _id_ne: string;
}>;
