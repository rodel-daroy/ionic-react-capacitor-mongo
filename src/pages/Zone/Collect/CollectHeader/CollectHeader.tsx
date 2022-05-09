import { SegmentChangeEventDetail } from '@ionic/core';
import { IonButtons, IonSegment, IonSegmentButton, useIonRouter } from '@ionic/react';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { Header } from 'src/features';
import { COLLECT_SEGMENT } from 'src/features/packs/types';
import { StyledCollectHeader, StyledCollectHeaderTitle } from './style';

interface IProps {
    segment?: COLLECT_SEGMENT;
}
export const CollectHeader: React.FC<IProps> = ({ segment }: IProps) => {
    const { push } = useIonRouter();

    const match = useRouteMatch<{ zoneId: string }>();

    /* Push to route of new segment & persist new segment (make it the new defaultSegment) */
    const handleSegmentChange = useCallback(
        ({ detail }: CustomEvent<SegmentChangeEventDetail>) => {
            if (detail.value && detail.value !== segment) {
                const value = detail.value || COLLECT_SEGMENT.PACKS;
                const direction = 'none';
                push(`/zone/${match.params.zoneId}/collect/${value}`, direction);
                localStorage.setItem('current_collect_segment', detail.value);
            }
        },
        [segment, push, match.params.zoneId],
    );

    return (
        <React.Fragment>
            <Header />
            <StyledCollectHeader>
                <StyledCollectHeaderTitle>Collect</StyledCollectHeaderTitle>
                <IonButtons slot="end">
                    <IonSegment mode="ios" value={segment} onIonChange={handleSegmentChange}>
                        <IonSegmentButton value={COLLECT_SEGMENT.CARDS}>
                            <FormattedMessage
                                defaultMessage="Cards"
                                description="Collect: Segmet-Button label for cards"
                            />
                        </IonSegmentButton>
                        <IonSegmentButton value={COLLECT_SEGMENT.PACKS}>
                            <FormattedMessage
                                defaultMessage="Packs"
                                description="Collect: Segmet-Button label for packs"
                            />
                        </IonSegmentButton>
                    </IonSegment>
                </IonButtons>
            </StyledCollectHeader>
        </React.Fragment>
    );
};
