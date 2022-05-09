import { IonButton, IonItem, IonListHeader } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectChildZonesBySearchText, selectZoneById } from '../../../appDataSlice';

interface IProps {
    zoneId: string;
    searchText: string;
    onSelect: (zoneId: string) => void;
}
export const RootZone: React.FC<IProps> = ({ zoneId, onSelect, searchText }: IProps) => {
    const rootZone = useSelector((state: RootState) => selectZoneById(state, zoneId));
    const childZones = useSelector((state: RootState) => selectChildZonesBySearchText(state, zoneId, searchText));

    return (
        <div>
            <IonListHeader>{rootZone?.name}</IonListHeader>
            {childZones.map(({ _id, name }) => (
                <IonItem key={_id}>
                    <IonButton fill="clear" onClick={() => onSelect(_id)}>
                        {name}
                    </IonButton>
                </IonItem>
            ))}
        </div>
    );
};
