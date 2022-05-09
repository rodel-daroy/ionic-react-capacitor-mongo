import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IonHeader, IonButtons } from '@ionic/react';
import { chevronBack, star } from 'ionicons/icons';
import { RootState } from 'src/boot/types';
import {
    StyledAlpha,
    StyledCircle,
    StyledCoins,
    StyledDot,
    StyledIcon,
    StyledScore,
    StyledToolbar,
    StyledValue,
    StyledBackIcon,
    StyledZone,
} from './style';
import { selectCurrentZone, setCurrentZone } from 'src/features/appData/appDataSlice';
import { useAppDispatch } from 'src/boot/store';

export const DrawerHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentZone = useSelector(selectCurrentZone);
    const userCoins = useSelector((state: RootState) => state.userData.me?.coins);
    const userScore = useSelector((state: RootState) => state.userData.me?.points);

    const handleClick = useCallback(() => {
        dispatch(setCurrentZone(null));
    }, [dispatch]);

    return (
        <IonHeader>
            <StyledToolbar>
                <IonButtons slot="start">
                    <StyledBackIcon icon={chevronBack} onClick={handleClick} />
                </IonButtons>

                {currentZone && <StyledZone>{currentZone.name}</StyledZone>}

                <IonButtons slot="primary">
                    <StyledAlpha>Alpha</StyledAlpha>
                    <StyledScore>
                        <StyledIcon icon={star} />
                        {typeof userScore === 'number' ? userScore : <StyledValue />}
                    </StyledScore>

                    <StyledCoins>
                        <StyledCircle>
                            <StyledDot />
                        </StyledCircle>
                        {typeof userCoins === 'number' ? userCoins : <StyledValue />}
                    </StyledCoins>
                </IonButtons>
            </StyledToolbar>
        </IonHeader>
    );
};
