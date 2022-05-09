import { SerializedError, EntityState } from '@reduxjs/toolkit';
import { STATUS } from 'src/utility';

export enum NOTIFICATION_TYPE {
    NOTIFICATION = 'notification',
    ACHIEVEMENT = 'achievement',
}
export enum NOTIFICATION_STATUS {
    NOT_READ = 0,
    READ = 1,
    ARCHIEVED = 2,
    DELETED = 3,
}

export interface INotification {
    _id: string;
    _user_id: string;
    type: NOTIFICATION_TYPE;
    status: NOTIFICATION_STATUS;
    content: string;
    title: string;
    category: string;
    createdAt: string;
}

interface IBaseState {
    status: STATUS;
    error: Error | SerializedError | null;
}
export type INotificationsState = IBaseState;

export type INotificationsSliceState = {
    status: STATUS;
    error: Error | SerializedError | null;
    notifications: INotificationsState & EntityState<INotification>;
};

export type INotificationQueryInput = Partial<{
    createdAt_nin: string[];
    content_in: string[];
    category_gte: string;
    _id_lt: string;
    status_nin: number[];
    _user_id_exists: boolean;
    AND: INotificationQueryInput[];
    _id: string;
    content_exists: boolean;
    category_in: string[];
    category_nin: string[];
    title_gt: string;
    category: string;
    title_in: string[];
    _user_id_ne: string;
    createdAt_gt: string;
    status_exists: boolean;
    _id_exists: boolean;
    category_gt: string;
    status_gte: number;
    content: string;
    _user_id_in: string[];
    title: string;
    createdAt_ne: string;
    title_lt: string;
    category_ne: string;
    content_lt: string;
    createdAt: string;
    category_exists: boolean;
    _user_id_gte: string;
    _user_id_nin: string[];
    createdAt_in: string[];
    createdAt_gte: string;
    _id_lte: string;
    content_nin: [string];
    createdAt_lte: string;
    status_gt: number;
    category_lt: string;
    _id_ne: string;
    type_ne: string;
    OR: INotificationQueryInput[];
    _user_id_gt: string;
    category_lte: string;
    type_lte: string;
    type_gte: string;
    status: number;
    content_gte: string;
    type_lt: string;
    title_nin: string[];
    status_lte: number;
    type_gt: string;
    content_lte: string;
    _user_id: string;
    _user_id_lte: string;
    title_gte: string;
    type_nin: string[];
    title_exists: boolean;
    type_in: string[];
    type_exists: boolean;
    _id_in: string[];
    status_lt: number;
    type: string;
    createdAt_lt: string;
    _id_gte: string;
    createdAt_exists: boolean;
    _id_gt: string;
    _id_nin: string[];
    content_gt: string;
    _user_id_lt: string;
    title_ne: string;
    status_ne: number;
    status_in: number[];
    title_lte: string;
    content_ne: string;
}>;

export type INotificationUpdateInput = Partial<{
    title: string;
    title_unset: boolean;
    category: string;
    createdAt_unset: boolean;
    createdAt: string;
    type_unset: boolean;
    category_unset: boolean;
    type: string;
    _id_unset: boolean;
    status_inc: number;
    status: number;
    _user_id_unset: boolean;
    content_unset: boolean;
    status_unset: boolean;
    content: string;
    _id: string;
    _user_id: string;
}>;
