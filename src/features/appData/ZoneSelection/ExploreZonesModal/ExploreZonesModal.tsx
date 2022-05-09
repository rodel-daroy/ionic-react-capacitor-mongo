import { IonContent, IonList, IonSearchbar, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectRootZoneIdsBySearchText } from '../../appDataSlice';
import { RootZone } from './RootZone';
import { StyledModalTitle } from './style';

export const ExploreZonesModal = React.memo(function ExploreZonesModal({
    onSelect,
}: {
    onSelect: (zoneId: string) => void;
}) {
    const [searchText, setSearchText] = useState('');
    const rootZoneIds = useSelector((state: RootState) => selectRootZoneIdsBySearchText(state, searchText));

    return (
        <IonContent fullscreen={true}>
            <IonToolbar>
                <StyledModalTitle>Explore Zones</StyledModalTitle>
                <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)}></IonSearchbar>
            </IonToolbar>
            <IonList>
                {rootZoneIds.map((zoneId) => (
                    <RootZone key={zoneId} zoneId={zoneId} searchText={searchText} onSelect={onSelect} />
                ))}
            </IonList>
        </IonContent>
    );
});
