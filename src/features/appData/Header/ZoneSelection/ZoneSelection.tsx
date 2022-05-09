import React, { useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { selectCurrentZone } from 'src/features/appData/appDataSlice';
import { StyledName, StyledTrigger } from './style';

export const ZoneSelection: React.FC = () => {
    const currentZone = useSelector(selectCurrentZone);
    const select = useRef<HTMLIonSelectElement>(null);

    return (
        <React.Fragment>
            <StyledTrigger onClick={() => select.current?.open()}>
                <IonIcon icon={chevronDown} style={{ fontSize: '30px' }} />
                <StyledName>{currentZone?.name}</StyledName>
            </StyledTrigger>
        </React.Fragment>
    );
};
