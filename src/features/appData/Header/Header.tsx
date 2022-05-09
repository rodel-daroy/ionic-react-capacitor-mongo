import React, { useCallback, useEffect } from 'react';
import { IonButtons, IonHeader, IonIcon, useIonRouter } from '@ionic/react';
import { personCircle, fileTrayFull } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { useAppDispatch } from 'src/boot/store';
import { fetchNotifications, selectHasUnreadNotifications } from 'src/features/notifications/notificationsSlice';
import { StyledImage, StyledActivities, StyledToolbar } from './style';
import { fetchAllAchievements } from 'src/features/achievements';
import { ScoreAndPoints } from '../ScoreAndPoints';

export const Header: React.FC = React.memo(function Header() {
    const dispatch = useAppDispatch();
    const { push } = useIonRouter();
    const userId = useSelector((state: RootState) => state.userData.me?._id);
    const hasUnreadNotifications = useSelector(selectHasUnreadNotifications);

    const navigateToAccount = useCallback(() => push(`/account`), [push]);
    const navigateToActivities = useCallback(() => push(`/activity`), [push]);

    useEffect(() => {
        if (!userId) return;
        void dispatch(fetchNotifications());
        void dispatch(fetchAllAchievements());
        const interval = setInterval(() => {
            void dispatch(fetchNotifications());
            void dispatch(fetchAllAchievements());
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, [dispatch, userId]);

    const handleLogoClick = useCallback(() => {
        push('/', 'root');
    }, [push]);

    return (
        <IonHeader>
            <StyledToolbar>
                <IonButtons slot="start">
                    <StyledImage
                        src="/assets/icon/favicon.png"
                        alt="Fanzone Media GmbH Logo"
                        onClick={handleLogoClick}
                    />
                </IonButtons>

                <IonButtons slot="primary">
                    <ScoreAndPoints />

                    <StyledActivities hasUnreadNotifications={hasUnreadNotifications} onClick={navigateToActivities}>
                        <IonIcon icon={fileTrayFull} />
                    </StyledActivities>

                    <IonIcon
                        onClick={navigateToAccount}
                        style={{ padding: '10px', cursor: 'pointer', fontSize: '40px' }}
                        icon={personCircle}
                    />
                </IonButtons>
            </StyledToolbar>
        </IonHeader>
    );
});
