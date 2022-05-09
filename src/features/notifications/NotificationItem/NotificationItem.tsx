import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectNotificationById } from '../notificationsSlice';
import { NOTIFICATION_STATUS } from '../types';
import { StyledContent, StyledDate, StyledImage, StyledTime, StyledWrapper } from './style';

interface IProps {
    notificationId: string;
}
export const NotificationItem: React.FC<IProps> = ({ notificationId }: IProps) => {
    const notification = useSelector((state: RootState) => selectNotificationById(state, notificationId));

    return (
        <StyledWrapper seen={notification?.status === NOTIFICATION_STATUS.READ}>
            <StyledTime>
                <FormattedTime hourCycle="h24" value={notification?.createdAt} />
            </StyledTime>
            <StyledDate>
                <FormattedDate dateStyle="long" value={notification?.createdAt} />
            </StyledDate>
            <StyledImage></StyledImage>
            <StyledContent>{notification?.content}</StyledContent>
        </StyledWrapper>
    );
};
