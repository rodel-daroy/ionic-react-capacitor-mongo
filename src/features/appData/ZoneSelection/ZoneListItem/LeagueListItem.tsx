import { IonIcon, useIonRouter } from '@ionic/react';
import { reader } from 'ionicons/icons';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectZoneById } from '../../appDataSlice';
import { StyledLeagueCardWrapper, StyledLeagueName, StyledCollection, StyledCollectionCount } from './styles';

export const LeagueListItem = React.memo(function LeagueListItem({ zoneId }: { zoneId: string }) {
    const { push } = useIonRouter();
    const zone = useSelector((state: RootState) => selectZoneById(state, zoneId));

    const onSelectSubZone = useCallback(
        (zoneId: string) => {
            push(`/zone/${zoneId}/home`);
        },
        [push],
    );

    return (
        <StyledLeagueCardWrapper id={zoneId} onClick={() => onSelectSubZone(zoneId)}>
            <StyledLeagueName>{zone?.name}</StyledLeagueName>
            <StyledCollection>
                <StyledCollectionCount>
                    {zone?.zoneMetaCardCount.owned ?? 0}/{zone?.zoneMetaCardCount.total}
                </StyledCollectionCount>
                <IonIcon icon={reader} size="18"></IonIcon>
            </StyledCollection>
        </StyledLeagueCardWrapper>
    );
});
