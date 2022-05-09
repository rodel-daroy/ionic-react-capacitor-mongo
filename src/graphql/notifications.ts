import gql from 'graphql-tag';
import { INotification, INotificationQueryInput, INotificationUpdateInput } from 'src/features/notifications/types';
import { createMutation } from './createMutation';
import { createQuery } from './createQuery';

const NotificationFragment = gql`
    fragment Notification_Notification on Notification {
        _id
        _user_id
        category
        type
        content
        title
        status
        createdAt
    }
`;

const GetNotifications = gql`
    query GetNotifications($userId: ObjectId!) {
        notifications(query: { _user_id: $userId, status_in: [0, 1] }) {
            ...Notification_Notification
        }
    }
    ${NotificationFragment}
`;

const GetUnreadNotifications = gql`
    query GetUnreadNotifications($userId: ObjectId!) {
        notifications(query: { _user_id: $userId, status: 0 }) {
            ...Notification_Notification
        }
    }
    ${NotificationFragment}
`;

const UpdateManyNotifications = gql`
    mutation UpdateManyNotifications($query: NotificationQueryInput, $updates: NotificationUpdateInput!) {
        updateManyNotifications(set: $updates, query: $query) {
            matchedCount
            modifiedCount
        }
    }
`;

/** Fetches all read & unread notifications
 */
const fetchNotifications = createQuery<{ userId: string }, { notifications: INotification[] }>({
    query: GetNotifications,
});

/** Fetches all unread notifications
 */
const fetchUnreadNotifications = createQuery<{ userId: string }, { notifications: INotification[] }>({
    query: GetUnreadNotifications,
});

/** Updates all matched notifications
 */
const updateNotifications = createMutation<
    INotificationQueryInput,
    { matchedCount: number; modifiedCount: number },
    { updates: INotificationUpdateInput }
>({
    mutation: UpdateManyNotifications,
});

export const notificationsApi = {
    fetchNotifications,
    fetchUnreadNotifications,
    updateNotifications,
};
