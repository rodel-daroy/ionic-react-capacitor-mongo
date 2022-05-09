import React, { useEffect, useMemo } from 'react';
import { FormattedMessage, FormattedRelativeTime } from 'react-intl';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import {
    selectNotificationIdsUnread,
    selectNotificationsRead,
    updateNotifications,
} from 'src/features/notifications/notificationsSlice';
import { INotification, NOTIFICATION_STATUS } from 'src/features/notifications/types';
import { getDayDifference } from 'src/utility';
import { NotificationItem } from '../NotificationItem';
import { StyledNotificationList, StyledSectionTitle, NotificationsPageContainer } from './styles';

export const NotificationsSegment: React.FC = () => {
    const dispatch = useAppDispatch();
    const unreadNotificationIds = useSelector(selectNotificationIdsUnread);
    const readNotifications = useSelector(selectNotificationsRead);

    const renderedUnreadNotifications = useMemo(
        () =>
            unreadNotificationIds.length ? (
                <li>
                    <StyledSectionTitle>
                        <FormattedMessage defaultMessage="New" description="New" />
                    </StyledSectionTitle>

                    <StyledNotificationList>
                        {unreadNotificationIds.map((id) => (
                            <NotificationItem key={id} notificationId={id} />
                        ))}
                    </StyledNotificationList>
                </li>
            ) : null,
        [unreadNotificationIds],
    );

    const sortedNotifications = useMemo(() => {
        return readNotifications.reduce((sortedNotifications, notification) => {
            const dayDifference = getDayDifference(new Date(), new Date(notification.createdAt));
            return {
                ...sortedNotifications,
                // eslint-disable-next-line security/detect-object-injection
                [dayDifference]: [...(sortedNotifications[dayDifference] || []), notification],
            };
        }, {} as Record<string, INotification[]>);
    }, [readNotifications]);

    const renderedNotifications = useMemo(
        () =>
            Object.keys(sortedNotifications).length
                ? Object.entries(sortedNotifications).map(([dayDifference, notifications]) => (
                      <li key={dayDifference}>
                          <StyledSectionTitle>
                              <FormattedRelativeTime value={parseInt(dayDifference)} unit="day" numeric="auto" />
                          </StyledSectionTitle>
                          <StyledNotificationList>
                              {notifications.map((unreadNotification) => (
                                  <NotificationItem
                                      key={unreadNotification._id}
                                      notificationId={unreadNotification._id}
                                  />
                              ))}
                          </StyledNotificationList>
                      </li>
                  ))
                : null,
        [sortedNotifications],
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (unreadNotificationIds.length === 0) return;

            void dispatch(
                updateNotifications({
                    query: { _id_in: unreadNotificationIds },
                    updates: { status: NOTIFICATION_STATUS.READ },
                }),
            );
        }, 2000);
        return () => clearTimeout(timeout);
    }, [dispatch, unreadNotificationIds]);

    return (
        <NotificationsPageContainer>
            <StyledNotificationList>
                {renderedUnreadNotifications}
                {renderedNotifications}
            </StyledNotificationList>
        </NotificationsPageContainer>
    );
};
