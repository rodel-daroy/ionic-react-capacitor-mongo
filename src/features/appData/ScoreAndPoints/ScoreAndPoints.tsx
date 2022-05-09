import { star } from 'ionicons/icons';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { StyledScore, StyledCoins, StyledCircle, StyledDot, StyledIcon, StyledValue } from './style';
import { useIonRouter } from '@ionic/react';

export const ScoreAndPoints: React.FC = () => {
    const { push } = useIonRouter();

    const userCoins = useSelector((state: RootState) => state.userData.me?.coins);
    const userScore = useSelector((state: RootState) => state.userData.me?.points);

    const navigateToAccount = useCallback(() => push(`/account`), [push]);

    return (
        <React.Fragment>
            <StyledScore onClick={navigateToAccount}>
                <StyledIcon icon={star} />
                {typeof userScore === 'number' ? userScore : <StyledValue />}
            </StyledScore>

            <StyledCoins onClick={navigateToAccount}>
                <StyledCircle>
                    <StyledDot />
                </StyledCircle>
                {typeof userCoins === 'number' ? userCoins : <StyledValue />}
            </StyledCoins>
        </React.Fragment>
    );
};
