import { SegmentChangeEventDetail } from '@ionic/core';
import React, { useCallback, useMemo, useState } from 'react';
import { IonButtons, IonSegmentButton, useIonRouter } from '@ionic/react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { chevronBack } from 'ionicons/icons';
import { useAppDispatch } from 'src/boot/store';
import { fetchNotifications, NotificationsSegment } from 'src/features/notifications';
import { AchievementsSegment } from 'src/features/achievements';
import {
    StyledHeader,
    StyledIcon,
    StyledTitle,
    StyledToolbar,
    StyledSegment,
    StyledAlpha,
    StyledHeader2,
    StyledPage,
    StyledContent,
} from './styles';
import { selectCurrentZone } from '../appDataSlice';
import { ScoreAndPoints } from '../ScoreAndPoints';

export const ActivitiesDrawer: React.FC = () => {
    const router = useIonRouter();
    const dispatch = useAppDispatch();
    const [segment, setSegment] = useState('notifications');
    const currentZone = useSelector(selectCurrentZone);

    const handleSegmentChange = useCallback(
        (e: CustomEvent<SegmentChangeEventDetail>) => setSegment(e.detail.value || 'notifications'),
        [setSegment],
    );

    const handleClose = useCallback(() => {
        void dispatch(fetchNotifications());
        router.push(router.routeInfo.lastPathname || '/', 'back');
    }, [dispatch, router]);

    const ActiveSegment = useMemo(
        () => (segment === 'notifications' ? <NotificationsSegment /> : <AchievementsSegment />),
        [segment],
    );

    return (
        <StyledPage>
            <StyledHeader>
                <StyledToolbar>
                    <IonButtons slot="start">
                        <StyledIcon icon={chevronBack} onClick={handleClose} />
                        {currentZone?.name}
                    </IonButtons>

                    <IonButtons slot="end">
                        <StyledAlpha>Alpha</StyledAlpha>
                        <ScoreAndPoints />
                    </IonButtons>
                </StyledToolbar>
            </StyledHeader>
            <StyledHeader2>
                <StyledTitle>
                    <FormattedMessage defaultMessage="Activity" description="Activity-Drawer Title" />
                </StyledTitle>
                <IonButtons slot="end">
                    <StyledSegment mode="ios" value={segment} onIonChange={handleSegmentChange}>
                        <IonSegmentButton value="notifications">
                            <FormattedMessage defaultMessage="Notifications" description="Notifications" />
                        </IonSegmentButton>
                        <IonSegmentButton value="achievements">
                            <FormattedMessage defaultMessage="Achievements" description="Achievements" />
                        </IonSegmentButton>
                    </StyledSegment>
                </IonButtons>
            </StyledHeader2>
            <StyledContent fullscreen>{ActiveSegment}</StyledContent>
        </StyledPage>
    );
};
